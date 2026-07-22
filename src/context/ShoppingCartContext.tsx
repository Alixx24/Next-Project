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
    handleIncreaseProductQty: (id: number) => void;
    handleDecreaseProductQty: (id: number) => void;
    getProductQty: (id: number) => number;
};

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
    undefined
);

export function ShoppingCartContextProvider({ 
    children,
}: ShoppingCartContextProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    
    const handleIncreaseProductQty = (id: number) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === id);
            
            if (!existingItem) {
                return [...prevItems, { id, qty: 1 }];
            }
            
            return prevItems.map(item => 
                item.id === id 
                    ? { ...item, qty: item.qty + 1 }
                    : item
            );
        });
    };

    const handleDecreaseProductQty = (id: number) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === id);
            
            if (!existingItem) return prevItems;
            
            if (existingItem.qty === 1) {
                return prevItems.filter(item => item.id !== id);
            }
            
            return prevItems.map(item => 
                item.id === id 
                    ? { ...item, qty: item.qty - 1 }
                    : item
            );
        });
    };

    const getProductQty = (id: number) => {
        const item = cartItems.find(item => item.id === id);
        return item?.qty || 0;
    };

    return (
        <ShoppingCartContext.Provider value={{ 
            cartItems, 
            handleIncreaseProductQty,
            handleDecreaseProductQty,
            getProductQty
        }}>
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