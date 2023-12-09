'use client'
import SellerDashboardHeader from "@/components/header/sellerDashboardHeader";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { enlistProduct } from "@/graphql/mutations";
import { validateFields } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EnlistSellerProduct(){
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState<number>()
    const [price, setPrice] = useState<number>()
    const handlePriceChange = (e: { currentTarget: { value: any; }; }) => {
        const inputValue = e.currentTarget.value;
        setPrice(inputValue)
      };
      const router = useRouter();
    async function handleEnlist(){
        if(validateFields({image, name, description, quantity, price}) && price && quantity) {
            var corrPrice = parseFloat(price+"")
            var response = await enlistProduct({name, image_url: image, description, price: corrPrice, quantity}, {})
            if ('data' in response && response.data.data?.enlistProduct) {
                const {message, status} = response.data.data?.enlistProduct;
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
                    title: "Congratulations!",
                    description: message
                  })
                  // reroute to login
                  router.push('/dashboard');
                }
            } else {
                console.error("GraphQL response is missing data:", response);
                console.log(response);
            }
        } else {
            toast({
                variant: "destructive",
                title: "Invalid Fields",
                description: "Enter correct fiels"
              })
        }
    }
    return(
        <div>
            <SellerDashboardHeader isEnlisting={true}/>
            <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold text-black mb-4 text-center">Product Details</h2>
                <input
                type="text"
                placeholder="Product Image URL"
                value={image}
                onChange={(e)=> setImage(e.currentTarget.value)}
                className="w-full p-2 border rounded mb-4 mt-4 text-black"
                />
                <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e)=> setName(e.currentTarget.value)}
                className="w-full p-2 border rounded mb-4 text-black"
                />
                <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e)=> setDescription(e.currentTarget.value)}
                className="w-full h-20 p-2 border rounded mb-4 text-black"
                />
                <input
                type="number"
                placeholder="Initial Quantity"
                value={quantity}
                onChange={(e)=> setQuantity(parseInt(e.currentTarget.value))}
                className="w-full p-2 border rounded mb-4 text-black"
                />
                <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={handlePriceChange}
                className="w-full p-2 border rounded mb-4 text-black"
                />
                <Button className="w-full bg-black text-white py-2 rounded" onClick={handleEnlist}>
                    Enlist now!
                </Button>
            </div>
        </div>
        </div>
    )
}