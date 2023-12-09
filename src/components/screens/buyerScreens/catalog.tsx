'use client'
import { fetchProducts } from "@/graphql/queries";
import { useEffect, useState } from "react";
import { toast } from "../../ui/use-toast";
import { Loader } from "../../loader.tsx";
import { Product } from "@/types/graphql";

export default function Catalog(){
  const [trendingP, setTrendingP] = useState<Product[]>([])
  const [latestP, setLatestP] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  async function LoadOrders() {
    const response = await fetchProducts()
    if ('data' in response && response.data.data?.fetchProducts) {
      const {message, status, latest, trending} = response.data.data?.fetchProducts;
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
          title: "Welcome",
          description: message
        })
        if (latest){
          setLatestP(latest)
        }
        if (trending){
          setTrendingP(trending)
        }
      }
    } else {
        console.error("GraphQL response is missing data:", response);
        console.log(response);
    }
    setLoading(false)
  }
  useEffect(()=>{
    LoadOrders()
  }, [])
    return (
        <div className="justify-center h-screen">
        <div className="w-full min-h-[20] bg-white p-4 mt-5 rounded shadow-md px-10">
          {/* Your latest product content goes here */}
          <h2 className="text-2xl font-semibold mb-2">Latest Products</h2>
          {loading ? <Loader/>:
          latestP.length === 0 ?<p className="text-gray-700 text-center py-20">No products to show</p>:
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {latestP.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <img
                    src={product.image_url}
                    alt={"Product"}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between bg-gray-100 py-3 px-6 rounded-md">
                  <div>
                    <h3 className="text-sm text-gray-700 font-bold">
                      <a href={"./login"}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">In-Stock: {product.quantity}</p>
                  </div>
                  <p className="text-sm text-gray-900 font-bold">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        }
        </div>
        <div className="w-full min-h-[20] bg-white p-4 mt-20 rounded shadow-md px-10">
          {/* Your trending product content goes here */}
          <h2 className="text-2xl font-semibold mb-2">Trending Products</h2>
          {loading ? <Loader/>:
          trendingP.length === 0 ?<p className="text-gray-700 text-center py-20">No products to show</p>:
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {trendingP.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <img
                    src={product.image_url}
                    alt={"Product"}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between bg-gray-100 py-3 px-6 rounded-md">
                  <div>
                    <h3 className="text-sm text-gray-700 font-bold">
                      <a href={"./login"}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">In-Stock: {product.quantity}</p>
                  </div>
                  <p className="text-sm text-gray-900 font-bold">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        }
        </div>
      </div>
    )
}