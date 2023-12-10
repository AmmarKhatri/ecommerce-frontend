import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { fetchOrderItemsForSeller } from "@/graphql/queries"
import { SellerOrderItem } from "@/types/graphql"
import { useEffect, useState } from "react"

export default function SellerCancelled(){
    async function fetchOrderItems(){
        const response = await fetchOrderItemsForSeller({status: "cancelled"}, {})
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
                title: "Cancelled Orders",
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
                    </TableRow>
                ))
            }
        </TableBody>
    </Table></div>: <div className=" text-center text-gray-800 mt-96 font-bold">No cancelled orders!</div>}
</>)
}