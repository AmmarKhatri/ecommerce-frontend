'use client'
import { useState } from "react"
import { Button } from "../ui/button"
import { usePathname, useRouter } from "next/navigation"
import { deleteAuthToken } from "@/context/AuthStorage"
import ShopCart from "../extras/shopCart";
import { Input } from "../ui/input"
import { searchProducts } from "@/graphql/queries"
import { toast } from "../ui/use-toast"

export default function BuyerDashboardHeader({setIsSearching, text, setText, setSearchList}: any) {
  const router = useRouter();
  const pathname = usePathname();
    async function handleLogout() {
        deleteAuthToken()
        router.push('/')
    }
    async function SearchRequest(text: string){
      const response = await searchProducts({text}, {})
      if ('data' in response && response.data.data?.searchProducts) {
        const {message, status, products} = response.data.data?.searchProducts;
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
          // filling search products
          if (products){
            console.log("Searched Products: "+products)
            setSearchList(products)
          }
        }
      } else {
        console.error("GraphQL response is missing data:", response);
        console.log(response);
      }
      
    }
    function handleSearch(e: { currentTarget: { value: string; }; }){
      const inputValue = e.currentTarget.value;
      if(inputValue === ""){
        setIsSearching(false)
      } else { //perform the search operation
        setIsSearching(true)
        console.log("Input: "+ inputValue)
        SearchRequest(inputValue)
      }
      setText(inputValue)
    }
    return (
      <nav className="bg-gray-50 p-4 flex justify-between border border-down">
        <div className="flex items-center">
          <span className=" text-3xl font-bold">Buyer Dashboard</span>
        </div>
        {pathname !== '/cart' && pathname !== '/address' && pathname !== '/product' ?<div className=" flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search Products..."
            className="md:w-[100px] lg:w-[1000px]"
            value={text}
            onChange={handleSearch}
          />
          {/* <Button type="submit"><SearchIcon/></Button> */}
        </div>:<></>}
        <div className="flex items-center space-x-4">
        {pathname !== '/cart' ?<Button size="sm" onClick={()=>{router.push("/cart")}}><ShopCart/></Button>:<></>}
          <Button size="sm" onClick={handleLogout}>Logout</Button>
        </div>
      </nav>
    )
  }
  