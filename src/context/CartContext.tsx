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
  // addToCart: (product: CartProduct) => void;
  removeProduct: (id: number) => void;
  // increase: (id: number) => void;
  // decrease: (id: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  // addToCart: () => {},
  removeProduct: () => {},
  updateCart: () => {},
  // increase: () => {},
  // decrease: () => {},
  clearCart: () => {},
});

export const useCartContext = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
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
  // console.log("add to cart trigger nwe state,",cart)
  // const addToCart = (product: Product) => {
  //   console.log("add to cart trigger")
  //   setCart((prevCart) => [...prevCart, product]);
  // };

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
  // const increase = (id: number) => {
  //   setCart((prevCart) =>
  //     prevCart.map((item) =>
  //       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  //     )
  //   );
  // };

  // const decrease = (id: number) => {
  //   setCart((prevCart) =>
  //     prevCart.map((item) =>
  //       item.id === id ? { ...item, quantity: item.quantity - 1 } : item
  //     )
  //   );
  // };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        updateCart,
        // addToCart,
        removeProduct,
        // increase,
        // decrease,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};