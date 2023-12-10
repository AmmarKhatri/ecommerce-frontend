import Bin from "@/components/extras/bin"
import WhiteTick from "@/components/extras/whiteTick"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { handleOrder } from "@/graphql/mutations"
import { fetchOrderItemsForSeller } from "@/graphql/queries"
import { SellerOrderItem } from "@/types/graphql"
import { useEffect, useState } from "react"

export default function SellerPending(){

    async function changePending({deliver, order_id, product_id, quantity}: {deliver: boolean, order_id: number, product_id: number, quantity: number, }){
      const response = await handleOrder({deliver, order_id, product_id, quantity}, {})
      if ('data' in response && response.data.data?.handleOrder) {
          const {message, status} = response.data.data?.handleOrder;
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
              title: "Updated Order",
              description: message
            })
            fetchOrderItems()
          }
        } else {
          console.error("GraphQL response is missing data:", response);
          console.log(response);
        }
    }
    async function fetchOrderItems(){
        const response = await fetchOrderItemsForSeller({status: "placed"}, {})
        if ('data' in response && response.data.data?.fetchOrderItemsForSeller) {
            const {message, status, orders} = response.data.data?.fetchOrderItemsForSeller;
            // Now you can use 'message' and 'status' as needed
            console.log("Message:", message);
            console.log("Status:", status);
            // Add your logic here based on the response data
            if (status !== 200){
              toast({
                variant: "destructive",
                title: "Error: Status "+ status,
                description: message
              })
            } else {
              toast({
                variant: "default",
                title: "Pending Orders",
                description: message
              })
              if (orders){
                setOrderItems([...orders])
              }
            }
          } else {
            console.error("GraphQL response is missing data:", response);
            console.log(response);
          }
    }
    useEffect(()=>{
        fetchOrderItems()
    },[])
    const [orderItems, setOrderItems] = useState<SellerOrderItem[]>([])
    return(
    <>
    {orderItems.length !== 0 ?<div><Table>
        <TableCaption> Pending Orders List</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead className="w-[100px]">Product</TableHead>
                    <TableHead className="w-[150px]">Name</TableHead>
                    <TableHead>Buyer Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className=" text-center">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="w-[100px] text-center">Total</TableHead>
                    <TableHead className="w-[100px] text-center">Deliver</TableHead>
                    <TableHead className="w-[100px] text-center">Cancel</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {
                orderItems.map((prod, i) =>(
                    <TableRow key={prod.id}>
                        <TableCell className=" text-center">{prod.id}</TableCell>
                        <TableCell><img src={prod.image_url} className=" w-10 h-10"/></TableCell>
                        <TableCell>{prod.name}</TableCell>
                        <TableCell>{prod.buyer_name}</TableCell>
                        <TableCell>{prod.status}</TableCell>
                        <TableCell className=" text-center">{prod.quantity}</TableCell>
                        <TableCell  className="text-right">${prod.price}</TableCell>
                        <TableCell  className="text-center">${(prod.price * prod.quantity).toFixed(2)}</TableCell>
                        <TableCell className="w-[100px] text-center">
                            <Button className="sm" onClick={()=> {changePending({quantity: prod.quantity, order_id: prod.id, product_id: prod.product_id, deliver: true})}}>
                                <WhiteTick/>
                                </Button>
                            </TableCell>
                            <TableCell className="w-[100px] text-center">
                                <Button className="sm bg-red-400" onClick={()=> {changePending({quantity: prod.quantity, order_id: prod.id, product_id: prod.product_id, deliver: false})}}>
                                    <Bin/>
                                </Button>
                            </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table></div>: <div className=" text-center text-red-600 mt-96 font-bold">No pending orders!</div>}
</>)
}