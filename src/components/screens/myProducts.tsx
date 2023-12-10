import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Loader } from "../loader.tsx";
import { Button } from "../ui/button";
import { getEnlistedProducts } from "@/graphql/queries";
import { Product } from "@/types/graphql";
import { toast } from "../ui/use-toast";
import { delistProduct } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
import Bin from "../extras/bin";
import Edit from "../extras/edit";
import { Dialog } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import InventoryPopup from "./inventoryPopup";
export default function MyProducts() {
    const [isloading, setIsLoading] = useState(true)
    const [productList, setProductList] = useState<Product[]>([])
    const router = useRouter()
    async function EnlistedProducts() {
        try{
            const response = await getEnlistedProducts({})
            console.log(response)
            if ('data' in response && response.data?.data?.getEnlistedProducts) {
                const {message, status, products} = response.data?.data?.getEnlistedProducts;
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
                        title: "Fetched Enlisted Products",
                        description: message
                    })
                    if (products) {
                        setProductList(products)
                    }
                }
                //set loading to false
                setIsLoading(false)
            } else {
                console.error("GraphQL response is missing data:", response);
                console.log(response);
            }
        }catch(error) {
            console.error("Error:", error);
        }
    }
    async function DelistProduct({id}: {id: number}) {
        const response = await delistProduct({id},{})
        if ('data' in response && response.data?.data?.delistProduct) {
            const {message, status} = response.data?.data?.delistProduct;
            // Now you can use 'message' and 'status' as needed
            console.log("Message:", message);
            console.log("Status:", status);
            // Add your logic here based on the response data
            if (status !== 202){
                toast({
                    variant: "destructive",
                    title: "Error: Status "+ status,
                    description: message
                })
            } else {
                toast({
                    title: "Delisted Product",
                    description: message
                })
                EnlistedProducts()
            }
        } else {
            console.error("GraphQL response is missing data:", response);
            console.log(response);
        }
    }
    useEffect(()=>{
       EnlistedProducts()
    },[])
    return (
        isloading ? <Loader/>
        :productList && productList.length !== 0 ?
        <Table>
            <TableCaption> A list of all your enlisted products </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Product</TableHead>
                        <TableHead className="w-[120px]">Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className=" text-center">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="w-[100px] text-center">Manage</TableHead>
                        <TableHead className="w-[100px]">Delist</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {
                    productList.map((prod, i) =>(
                        <TableRow key={prod.id}>
                            <TableCell><img src={prod.image_url} className=" w-10 h-10"/></TableCell>
                            <TableCell>{prod.name}</TableCell>
                            <TableCell>{prod.description}</TableCell>
                            <TableCell className=" text-center">{prod.quantity}</TableCell>
                            <TableCell  className="text-right">${prod.price}</TableCell>
                            <TableCell className=" text-center">
                                <Dialog>
                                    <DialogTrigger>
                                        <Edit/>
                                    </DialogTrigger>
                                    <InventoryPopup product_id={prod.id} curr={prod.quantity} index={i} products={productList} setProducts={setProductList}/>
                                </Dialog>
                            </TableCell>
                            <TableCell>
                                <Button className="sm bg-red-400" onClick={()=> {DelistProduct({id: prod.id})}}>
                                    <Bin/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>: <div className=" text-center text-red-600 mt-96 font-bold">You have not registered any products, please enlist a few products!</div>
    );
}