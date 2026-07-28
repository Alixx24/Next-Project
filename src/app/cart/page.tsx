// 📁 src/app/cart/page.tsx
import { ShoppingCartContextProvider } from "@/context/ShoppingCartContext";
import CartList from "@/components/CartItem";
import CartSummary from "@/components/CartSummary.tsx";

// این تابع در سرور اجرا میشه (میتونه از دیتابیس بیاد)
async function getProducts() {
  // در اینجا میتونی از دیتابیس یا API بخونی
  return [
    { id: 1, title: "محصول ۱", price: 20 },
    { id: 2, title: "محصول ۲", price: 30 },
  ];
}

export default async function CartPage() {
  const products = await getProducts(); // اطلاعات در سرور دریافت میشه
  
  return (
    <ShoppingCartContextProvider>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <CartList products={products} /> {/* اطلاعات به کلاینت پاس داده میشه */}
        </div>
        <div className="col-span-1">
          <CartSummary />
        </div>
      </div>
    </ShoppingCartContextProvider>
  );
}