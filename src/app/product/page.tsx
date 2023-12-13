'use client'
import BuyerDashboardHeader from "@/components/header/buyerDashboardHeader"
import { Loader } from "@/components/loader.tsx"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { getProduct } from "@/graphql/queries"
import { CustomerReviews, PageProduct } from "@/types/graphql"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Rating} from '@mui/material'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Tick from "@/components/extras/check"
import { Product } from "@/types/graphql";
import { useCartContext } from "@/context/CartContext"

export default function ProductPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [product, setProduct] = useState<PageProduct>();
  const [reviews, setReviews] = useState<CustomerReviews[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter()
  const id = searchParams.get('id');
  const { updateCart } = useCartContext();
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
  
  async function fetchProduct(id: number){
    const response = await getProduct(id);
    if ('data' in response && response.data.data?.getProduct) {
      const {message, status, product, reviews} = response.data.data?.getProduct;
      // Now you can use 'message' and 'status' as needed
      console.log("Message:", message);
      console.log("Status:", status);
      // Add your logic here based on the response data
      if (status !== 200){
        console.log("Toast executed")
        toast({
          variant: "destructive",
          title: "Error: Status "+ status,
          description: message
        })
        
      } else {
        toast({
          variant: "default",
          title: "Fetched Data Successfully",
          description: message
        })
        // populate the fields
        if (product){ 
          setProduct(product)
        }
        if (reviews){
          setReviews([...reviews])
        }
      }
      setIsLoading(false)
    } else {
      console.error("GraphQL response is missing data:", response);
      console.log(response);
      setIsLoading(false)
    }
  }
  if (!id) {
    router.push("./dashboard")
    return
  }
  useEffect(()=>{
    fetchProduct(parseInt(id))
  },[])
  return (
    <div className="bg-white">
      <BuyerDashboardHeader/>
      {isLoading ? <Loader/>:
      product != undefined? 
      <div className="mx-auto px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg">
              <img src={product.image_url} alt={"Product"} className="object-cover object-center" />
            </div>
          </div>

          {/* Product details */}
          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>

                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  By {product.seller_name}
                </p>
              </div>

              <div>
                <Rating name="half-rating-read" value={product.average_rating} defaultValue={product.average_rating} precision={0.01} readOnly />
                <p className="ml-1">{product.average_rating.toFixed(2)} out of 5 ({product.count})</p>
              </div>
            </div>

            <p className="mt-6 text-gray-500">{product.description}</p>
            {product.quantity > 0?<p className="flex gap-x-2 mt-6 text-gray-500"><Tick/>In Stock</p>: <p className="flex gap-x-2 mt-6 text-gray-500">Out of stock</p>}
            <div className="mt-1 gap-y-4 sm:grid-cols-2">
              <Button
                type="button"
                onClick={() => {
                  let a: Product = {
                    created_at: "",
                    description: product.description,
                    id: product.id,
                    image_url: product.image_url,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    seller_id: product.seller_id,
                    updated_at: ""
                  }
                  handleCart(a)}}
                className=" w-full items-center justify-center rounded-md border border-transparen px-8 py-3 text-base font-medium text-white " disabled={product.quantity <= 0}
              >
                Add to cart
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <div className=" font-bold">Reviews</div>
            {
              reviews.length == 0? <div className=" text-center mt-10">No reviews</div>:
              <div>
                <Table>
                <TableCaption>A list of customer reviews</TableCaption>
                <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead className="w-[150px]">Rating</TableHead>
                  <TableHead>Comment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review, i) => (
                  <TableRow key={review.id}>
                    <TableCell>{review.buyer_name}</TableCell>
                    <TableCell><Rating name="read-only" value={review.rating} readOnly /></TableCell>
                    {review.comment == null || review.comment === ""? <TableCell> - </TableCell>:<TableCell>{review.comment}</TableCell>}
                  </TableRow>
                ))}
              </TableBody>
              </Table>
              </div>
            }
          </div>
        </div>
      </div>:<div>
        <div className=" ml-64 mt-32 text-3xl font-bold font-serif">
          Product does not exist
        </div>
        <Button onClick={()=>{router.back()}} className=" ml-64 mt-2"> Go back</Button>
      </div>}
    </div>
  )
}
