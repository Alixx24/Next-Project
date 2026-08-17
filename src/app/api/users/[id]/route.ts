import { NextRequest, NextResponse } from 'next/server';
import axios, { isAxiosError } from 'axios';

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://127.0.0.1:8000/api';

type DeleteStrategy = 'hard' | 'soft';

async function tryHardDelete(id: string) {
  await axios.delete(`${LARAVEL_API_URL}/users/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });
}

async function trySoftDelete(id: string) {
  const payload = { is_active: false };

  try {
    await axios.put(`${LARAVEL_API_URL}/users/${id}`, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
    return;
  } catch (putError) {
    if (!isAxiosError(putError) || putError.response?.status !== 405) {
      throw putError;
    }
  }

  await axios.patch(`${LARAVEL_API_URL}/users/${id}`, payload, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || Number.isNaN(Number(id))) {
    return NextResponse.json(
      { success: false, error: 'شناسه کاربر نامعتبر است' },
      { status: 400 }
    );
  }

  try {
    await tryHardDelete(id);
    return NextResponse.json({ success: true, method: 'hard' satisfies DeleteStrategy });
  } catch (error) {
    if (!isAxiosError(error)) {
      return NextResponse.json(
        { success: false, error: 'خطای ناشناخته در حذف کاربر' },
        { status: 500 }
      );
    }

    const status = error.response?.status;

    if (status === 405) {
      try {
        await trySoftDelete(id);
        return NextResponse.json({ success: true, method: 'soft' satisfies DeleteStrategy });
      } catch (softDeleteError) {
        const softStatus = isAxiosError(softDeleteError)
          ? softDeleteError.response?.status
          : undefined;

        return NextResponse.json(
          {
            success: false,
            error:
              'سرور لاراول route حذف کاربر (DELETE /api/users/{id}) را پشتیبانی نمی‌کند. لطفاً در routes/api.php این route را اضافه کنید.',
            statusCode: softStatus ?? 405,
          },
          { status: 502 }
        );
      }
    }

    if (status === 404) {
      return NextResponse.json(
        { success: false, error: 'کاربر مورد نظر یافت نشد', statusCode: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.response?.data?.message || 'حذف کاربر با خطا مواجه شد',
        statusCode: status,
      },
      { status: status || 500 }
    );
  }
}
