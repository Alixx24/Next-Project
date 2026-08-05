// src/components/CartSummary.tsx
export default function CartSummary() {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="font-bold text-lg mb-4">خلاصه سبد خرید</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>جمع کل:</span>
          <span>۰ تومان</span>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded mt-4">
          ثبت سفارش
        </button>
      </div>
    </div>
  );
}