'use client'
import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";

export interface CartProduct {
  id: number;
  name: string;
  description: string;
  quantity: number;
  selected_qty: number;
  price: number;
  image_url: string;
  seller_id: number;
}

interface CartContextProps {
  cart: CartProduct[];
  updateCart: (product: CartProduct) => void;
  getCart: () => CartProduct[];
  removeProduct: (id: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  getCart: () => [],
  removeProduct: () => {},
  updateCart: () => {},
  clearCart: () => {},
});

export const useCartContext = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  let initialCart: CartProduct[] = []
  initialCart = JSON.parse(localStorage.getItem('cart') || '[]');
  const [cart, setCart] = useState<CartProduct[]>(initialCart);
  console.log("My cart: ", cart)
  function updateProductQuantity(id:number, delta:number) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              selected_qty: Math.min(
                item.quantity,
                Math.max(0, item.selected_qty + delta) // Clamp between 0 and quantity
              ),
            }
          : item
      ).filter((item) => item.selected_qty > 0) // Remove items with 0 selected qty
    );
  }
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeProduct = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  const updateCart = (product: CartProduct) => {
    const existingProductIndex = cart.findIndex((p) => p.id === product.id);

    if (existingProductIndex !== -1) {
      // Product exists, update selected_qty with increment, ensuring it doesn't go beyond quantity
      updateProductQuantity(product.id, product.selected_qty);
    } else {
      // Product doesn't exist, add it to the cart
      setCart((prevCart) => [...prevCart, product]);
    }
  }
  const getCart = () =>{
    return cart;
  }
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        getCart,
        updateCart,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};