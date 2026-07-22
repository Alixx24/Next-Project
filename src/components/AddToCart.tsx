"use client"
import { useShoppingCartContext } from "@/context/ShoppingCartContext";

function AddToCart() {
    const { cartItems, setCartItems } = useShoppingCartContext();
    
    return (
        <div className="mt-2">
            <button className="py-2 px-4 rounded bg-sky-500 text-white">+</button>
            <span className="mx-4">3</span>
            <button className="py-2 px-4 rounded bg-sky-500 text-white">-</button>
        </div>
    )
}
export default AddToCart;