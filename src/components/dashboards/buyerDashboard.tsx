import {useEffect, useState} from "react";
import BuyerDashboardHeader from "../header/buyerDashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Catalog from "../screens/buyerScreens/catalog";
import { Product } from "@/types/graphql";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import CartPlus from "../extras/cartPlus";
import useCart from "@/context/CartStorage";
import { toast } from "../ui/use-toast";
import Pending from "../screens/buyerScreens/pending";
import Fulfilled from "../screens/buyerScreens/fulfilled";
import Cancelled from "../screens/buyerScreens/cancelled";
export default function BuyerDashboard() {
  const [isSearching, setIsSearching] = useState(false)
  const [text, setText] = useState("")
  const [searchList, setSearchList] = useState<Product[]>([])
  const {cart, updateCart} = useCart()
  async function handleCart(prod: Product){
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
    toast({
      title: "Cart updated",
      description: "Added: "+prod.name+" to cart."
    })
  }
  useEffect(() => {},[]);
  return (
    <div>
      <BuyerDashboardHeader isSearching={isSearching} setIsSearching={setIsSearching} text={text} setText={setText} setSearchList={setSearchList}/>
      {/* optional search section */}
      {isSearching ? 
      searchList.length !== 0?
      <div className=" p-16"><Table>
            <TableCaption> Searched Products List </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Product</TableHead>
                        <TableHead className="w-[120px]">Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className=" text-center">In Stock</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="w-[100px] text-center"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {
                    searchList.map((prod, i) =>(
                        <TableRow key={prod.id}>
                            <TableCell><img src={prod.image_url} className=" w-10 h-10"/></TableCell>
                            <TableCell>{prod.name}</TableCell>
                            <TableCell>{prod.description}</TableCell>
                            <TableCell className=" text-center">{prod.quantity}</TableCell>
                            <TableCell  className="text-right">${prod.price}</TableCell>
                            <TableCell  className="text-center">
                                <Button className="sm" onClick={()=>handleCart(prod)}>
                                    <CartPlus/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table></div>: <div className=" text-center text-red-600 mt-96 font-bold">No search results!</div>:
        <div className=" flex py-10 justify-center">
          {/* buyer tabs section */}
          <Tabs defaultValue="catalog" className="w-full mx-20">
            <TabsList>
              <TabsTrigger value="catalog">Catalog</TabsTrigger>
              <TabsTrigger value="pending">Pending Orders</TabsTrigger>
              <TabsTrigger value="fulfilled">Fulfilled Orders</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="catalog">
              <Catalog/>
            </TabsContent>
            <TabsContent value="pending">
              <Pending/>
            </TabsContent>
            <TabsContent value="fulfilled">
              <Fulfilled/>
            </TabsContent>
            <TabsContent value="cancelled">
              <Cancelled/>
            </TabsContent>
          </Tabs>
        </div>
      }
    </div>
  );
}
