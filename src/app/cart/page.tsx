'use client';
import Tick from "@/components/extras/check";
import BuyerDashboardHeader from "@/components/header/buyerDashboardHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { CartProduct, useCartContext } from "@/context/CartContext";
// import useCart, { CartProduct } from "@/context/CartStorage";
import { createOrder } from "@/graphql/mutations";
import { getAddresses } from "@/graphql/queries";
import { Address } from "@/types/graphql";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Cart(){
    // const {cart, updateCart, removeProduct, clearCart} = useCart()
    const [add, setAdd] = useState<Address[]>()
    const { cart ,clearCart, updateCart, removeProduct } = useCartContext();
    const [selAdd, setSelAdd] = useState(-1)
    // Calculate subtotal
    const subtotal = cart.reduce((total, product) => {
        return total + product.selected_qty * product.price;
    }, 0);
    async function fetchAddresses(){
        const response = await getAddresses({})
        if ('data' in response && response.data.data?.getAddresses) {
            const {message, status, addresses} = response.data.data?.getAddresses;
            // Now you can use 'message' and 'status' as needed
            console.log("Message:", message);
            console.log("Status:", status);
            // Add your logic here based on the response data
            if (status !== 201){
              toast({
                variant: "destructive",
                title: "Error: Status "+ status,
                description: message
              })
            } else {
                console.log(addresses)
                setAdd([...addresses])
            }
          } else {
            console.error("GraphQL response is missing data:", response);
            console.log(response);
          }
    }
    useEffect(()=>{
        console.log("Fetch addresses was run")
        fetchAddresses()
    }, [])
    async function handleCheckout(){
        if (selAdd === -1){
            toast({
                variant: "destructive",
                title: "Address not selected",
                description: "An address must be selected to place an order"
            })
            alert("Please select an address")
            return
        }
        let list = []
        for(let i = 0; i < cart.length; i++){
            console.log("Printing")
            list.push([cart[i].id, cart[i].selected_qty])
        }
        const response = await createOrder({address: selAdd, cart: list},{})
        if ('data' in response && response.data.data?.placeOrder) {
            const {message, status, order_reference} = response.data.data?.placeOrder;
            // Now you can use 'message' and 'status' as needed
            console.log("Message:", message);
            console.log("Status:", status);
            // Add your logic here based on the response data
            if (status !== 201){
              toast({
                variant: "destructive",
                title: "Error: Status "+ status,
                description: message
              })
            } else {
              toast({
                variant: "default",
                title: "Order Placed | ID: "+order_reference,
                description: message
              })
              clearCart()
            }
          } else {
            console.error("GraphQL response is missing data:", response);
            console.log(response);
          }
    }
    function handleAdd(event: React.MouseEvent, prod: CartProduct){
        event.preventDefault();
        updateCart({
            id: prod.id,
            name: prod.name,
            description: prod.description,
            quantity: prod.quantity,
            selected_qty: 1,
            price: prod.price,
            seller_id: prod.seller_id,
            image_url: prod.image_url
        })
        
    }
    function handleSub(event: React.MouseEvent, prod: CartProduct){
        event.preventDefault();
        updateCart({
            id: prod.id,
            name: prod.name,
            description: prod.description,
            quantity: prod.quantity,
            selected_qty: -1,
            price: prod.price,
            seller_id: prod.seller_id,
            image_url: prod.image_url
          })
    }
    async function handleRemove(id: number){
        removeProduct(id)
    }

    return(
        <div>
            <BuyerDashboardHeader/>
            <div className="bg-white">
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-12 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>

                <form className="mt-8">
                <div>
                    <h2 className="sr-only">Items in your shopping cart</h2>

                    <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                    {cart.map((product) => (
                        <li className="flex py-6 sm:py-10">
                        <div className="flex-shrink-0">
                            <img
                            src={product.image_url}
                            alt={"Product Image: "+product.name}
                            className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                            />
                        </div>
                        <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                            <div>
                            <div className="flex justify-between sm:grid sm:grid-cols-2">
                                <div className="pr-6">
                                <h3 className="text-sm">
                                    <a href={"/image"} className="font-bold text-lg text-gray-700 hover:text-gray-800">
                                    {product.name}
                                    </a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                </div>

                                <p className="text-right text-sm font-bold text-gray-900">${product.price}</p>
                            </div>

                            <div className="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
                                
                                <div className=" space-x-8">
                                    <button className=" bg-slate-200 px-2 rounded-full" onClick={(e)=>handleSub(e,product)}>-</button>
                                    <span>{product.selected_qty}</span>
                                    <button className=" bg-slate-200 px-1.5 rounded-full"onClick={(e)=>handleAdd(e,product)}>+</button>
                                </div>
                                <div>
                                    <button className="sm pt-4 px-5" onClick={()=>{handleRemove(product.id)}}>Remove</button>
                                </div>
                                
                            </div>
                            </div>

                            <p className="mt-2 flex space-x-2 text-md font-bold text-gray-700">
                            <Tick/>
                            <span>In stock: {product.quantity}</span>
                            </p>
                        </div>
                        </li>
                    ))}
                    </ul>
                </div>

                {/* Order summary */}
                {!cart || cart.length === 0 ? <><img className=" mt-20 sm:ml-52 sm:pl-6"src="/emptyCart.png"/><a href="/dashboard" className="font-medium sm:ml-72 sm:pl-20 pt-20 text-gray-800 pl- hover:text-gray-600">
                          Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                        </a></>
                :<div className="mt-10 sm:ml-32 sm:pl-6">
                    <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                    <h2 className="sr-only">Order summary</h2>

                    <div className="flow-root">
                        <dl className="-my-4 divide-y divide-gray-200 text-sm">
                        <div className="flex items-center justify-between py-4">
                            <dt className="text-gray-600">Subtotal</dt>
                            <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                        </div>
                        <div className="flex items-center justify-between py-4">
                            <dt className="text-gray-600">Shipping</dt>
                            <dd className="font-medium text-gray-900">$5.00</dd>
                        </div>
                        <div className="flex items-center justify-between py-4">
                            <dt className="text-gray-600">Tax</dt>
                            <dd className="font-medium text-gray-900">${(subtotal*0.1).toFixed(2)}</dd>
                        </div>
                        <div className="flex items-center justify-between py-4">
                            <dt className="text-base font-medium text-gray-900">Order total</dt>
                            <dd className="text-base font-medium text-gray-900">${(subtotal + 5 + ((subtotal*0.1))).toFixed(2)}</dd>
                        </div>
                        </dl>
                    </div>
                    </div>
                    <div className="mt-10">
                    <button
                        type="submit"
                        onClick={handleCheckout}
                        className="w-full rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                        Checkout
                    </button>
                    </div>
                    <div className=" flex flex-1 pt-5 px-3 justify-between">
                        <div className=" font-bold">Select an Address</div>
                        <Link href={"/address"} className=" hover:font-bold">+ Add an address</Link>
                    </div>
                    <div className=" py-3">
                    <Select value={selAdd.toString()} onValueChange={(value: string)=> setSelAdd(parseInt(value))}>
                        <SelectTrigger className="w-full mb-5">
                            <SelectValue placeholder="Select an address" />
                        </SelectTrigger>
                        <SelectContent>
                            {add?.map((address)=>(
                                <SelectItem value={address.id.toString()}>{address.postal_code}, {address.add1}, {address.add2}, {address.city}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    </div>
                    <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        or 
                        <a href="/dashboard" className="font-medium text-gray-800 pl-5 hover:text-gray-600">
                          Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </p>
                    </div>
                </div>}
                </form>
            </div>
            </div>
        </div>
    )
}