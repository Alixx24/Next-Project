"use client"
import { useShoppingCartContext } from "@/context/ShoppingCartContext";

interface IAddToCartProps {
    id: string;
}

function AddToCart({ id }: IAddToCartProps) {
    const { handleIncreaseProductQty, handleDecreaseProductQty, getProductQty } = useShoppingCartContext();
    const productId = parseInt(id);
    const qty = getProductQty(productId);
    
    return (
        <div className="mt-2">
            <button 
                onClick={() => handleIncreaseProductQty(productId)} 
                className="py-2 px-4 rounded bg-sky-500 text-white"
            >
                +
            </button>
            <span className="mx-4">{qty}</span>
            <button 
                onClick={() => handleDecreaseProductQty(productId)}
                className="py-2 px-4 rounded bg-sky-500 text-white"
            >
                -
            </button>
        </div>
    )
}
export default AddToCart;