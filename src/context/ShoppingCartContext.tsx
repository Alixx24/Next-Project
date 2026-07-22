"use client"
import { createContext, useState, useContext } from "react"

type ShoppingCartContextProviderProps = {    
    children: React.ReactNode
};

type CartItem = {
    id: number;
    qty: number;
};

type ShoppingCartContextType = {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
    undefined
);

export function ShoppingCartContextProvider({ 
    children,
}: ShoppingCartContextProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    
    return (
        <ShoppingCartContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

export function useShoppingCartContext() {
    const context = useContext(ShoppingCartContext);
    if (context === undefined) {
        throw new Error("useShoppingCartContext must be used within a ShoppingCartContextProvider");
    }
    return context;
}