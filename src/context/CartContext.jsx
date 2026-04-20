import { createContext, useEffect, useState } from "react"
import { getCart } from "../services/api";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);


    const refreshCart = () => {
        getCart().then(cart => {
            setCartCount(cart.length)
            let totalPrice = 0;
            cart.forEach(item => {
                totalPrice += item.price * item.quantity;
            });
            setCartTotal (totalPrice)
        })
    }

    
 

    useEffect(() => {

        refreshCart()
    }, [])
  



    return (
        <CartContext.Provider
            value={{ cartCount, refreshCart, cartTotal }}
        >
            {children}
        </CartContext.Provider>
    );
}

