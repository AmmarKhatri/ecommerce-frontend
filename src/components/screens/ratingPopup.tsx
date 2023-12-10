import {
    DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {StarRating} from 'star-rating-react-ts'
import { Button } from "../ui/button";
import { SetStateAction, useState } from "react";
import { changeInventory, giveRating } from "@/graphql/mutations";
import { toast } from "../ui/use-toast";
import { Loader } from "../loader.tsx";
import { BuyerOrderItem } from "@/types/graphql";

export default function RatingPopup({order_id, product_id ,index, products, setProducts}: {order_id: number, product_id: number, index: number, products: BuyerOrderItem[], setProducts: any}) { 
    const [isLoading, setIsLoading] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [comment, setComment]= useState<string>("")
    const [stars, setStars]= useState<number>(0)
    const handleStars = (value: SetStateAction<number>)=>{
      setDisabled(false)
      setStars(value)
    }
    async function CreateRating(){
        setIsLoading(true)
        const response = await giveRating({order_id,product_id, rating: stars, comment},{})
        if ('data' in response && response.data?.data?.giveRating) {
            const {message, status} = response.data?.data?.giveRating;
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
                    title: "Gave rating | Order: "+ order_id,
                    description: message
                })
                setDisabled(true)
                var a = products
                a.splice(index, 1);
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
          <DialogTitle>Provide Feedback</DialogTitle>
          <DialogDescription>
            Please give a rating to this order
          </DialogDescription>
        </DialogHeader>
        <div className=" mx-auto">
          <StarRating numStars={5} onClick={handleStars}/>
        </div>
        <input
          type="text"
          placeholder="Comment"
          value={comment}
          onChange={(e)=> setComment(e.currentTarget.value)}
          className="w-full p-2 border rounded mb-4 text-black"
          />
        {
        isLoading ? <Loader/> :<Button type="submit" disabled={disabled} onClick={CreateRating} className="w-full bg-black text-white py-2 rounded">
             Submit
        </Button>
        }
      </DialogContent>
    </div>
  );
}
