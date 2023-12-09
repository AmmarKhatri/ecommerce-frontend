import {
    DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { changeInventory } from "@/graphql/mutations";
import { toast } from "../ui/use-toast";
import { Loader } from "../loader.tsx";

export default function InventoryPopup({product_id, curr, index, products, setProducts}: {product_id: number, curr: number, index: number, products: any, setProducts: any}) { 
    const [isLoading, setIsLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [inv, setInv]= useState<number>(curr)
    async function ChangeInventory({quantity}: {quantity: number}){
        setIsLoading(true)
        const response = await changeInventory({product_id, quantity},{})
        if ('data' in response && response.data?.data?.changeInventory) {
            const {message, status} = response.data?.data?.changeInventory;
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
                    title: "Inventory Changed | Product: "+ product_id,
                    description: message
                })
                setDisabled(true)
                var a = products
                a[index].quantity = inv
                setProducts([...a])
            }
            setIsLoading(false)
        } else {
            console.error("GraphQL response is missing data:", response);
            console.log(response);
        }
    }
  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Inventory</DialogTitle>
          <DialogDescription>
            Please edit your available inventory
          </DialogDescription>
        </DialogHeader>
        <input
          type="number"
          placeholder="New Quantity"
          value={inv}
          onChange={(e)=> setInv(parseInt(e.currentTarget.value))}
          className="w-full p-2 border rounded mb-4 text-black"
          />
        {
        isLoading ? <Loader/> :<Button type="submit" disabled={disabled} onClick={() =>{
                ChangeInventory({quantity: inv})}} className="w-full bg-black text-white py-2 rounded">
             Submit
        </Button>
        }
      </DialogContent>
    </div>
  );
}
