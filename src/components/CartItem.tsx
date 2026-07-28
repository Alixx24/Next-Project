// 📁 src/components/CartList.tsx (کلاینت)
"use client"

import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import CartItem from "./CartItem";

export default function CartList() {
  const { cartItems } = useShoppingCartContext();
  
  if (cartItems.length === 0) {
    return <p>سبد خرید خالی است</p>;
  }
  
  return (
    <>
      {cartItems.map(item => (
        <CartItem key={item.id} id={item.id} />
      ))}
    </>
  );
}