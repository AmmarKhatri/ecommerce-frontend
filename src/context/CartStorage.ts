// // useCart.ts
// 'use client';
// import { useState, useEffect } from 'react';
// export interface CartProduct {
//   id: number;
//   name: string;
//   description: string;
//   quantity: number;
//   selected_qty: number;
//   price: number;
//   image_url: string;
//   seller_id: number;
// }

// const useCart = () => {
//   let initialCart: CartProduct[] = []
//   if (typeof window !== 'undefined') {
//     initialCart = JSON.parse(localStorage.getItem('cart') || '[]');
//   }
//   const [cart, setCart] = useState<CartProduct[]>(initialCart);
//   // Update localStorage whenever cart changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   // Add or update a product in the cart
//   const updateCart = (newProduct: CartProduct) => {
//     const existingProductIndex = cart.findIndex((p) => p.id === newProduct.id);

//     if (existingProductIndex !== -1) {
//       // Product exists, update selected_qty with increment, ensuring it doesn't go beyond quantity
//       const updatedCart = [...cart];
//       const updatedProduct = { ...updatedCart[existingProductIndex] };
//       updatedProduct.selected_qty = Math.min(
//         updatedProduct.quantity,
//         updatedProduct.selected_qty + newProduct.selected_qty
//       );
//       updatedCart[existingProductIndex] = updatedProduct;
//       // If selected_qty is 0, remove the product from the cart
//       if (updatedProduct.selected_qty === 0) {
//         updatedCart.splice(existingProductIndex, 1);
//       } else {
//         updatedCart[existingProductIndex] = updatedProduct;
//       }
//       setCart(updatedCart);
//     } else {
//       // Product doesn't exist, add it to the cart
//       setCart((prevCart) => [...prevCart, newProduct]);
//     }
//   };

//   // Clear the entire cart
//   const clearCart = () => {
//     setCart([]);
//   };
//   // Remove a product from the cart based on product_id
//   const removeProduct = (productId: number) => {
//     const updatedCart = cart.filter((product) => product.id !== productId);
//     setCart(updatedCart);
//   };
//   return {
//     cart,
//     updateCart,
//     clearCart,
//     removeProduct
//   };
// };

// export default useCart;
