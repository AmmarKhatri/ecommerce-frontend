'use client'
import { useState } from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { deleteAuthToken } from "@/context/AuthStorage"
import ShopCart from "../extras/shopCart";
import { Input } from "../ui/input"
import { searchProducts } from "@/graphql/queries"

export default function BuyerDashboardHeader({setIsSearching, text, setText, setSearchList}: any) {
  const router = useRouter();
    async function handleLogout() {
        deleteAuthToken()
        router.push('/')
    }
    async function SearchRequest({text}: {text: string}){
      const response = await searchProducts({text}, {})
      
    }
    function handleSearch(e: { currentTarget: { value: any; }; }){
      const inputValue = e.currentTarget.value;
      if(inputValue === ""){
        setIsSearching(false)
      } else { //perform the search operation
        setIsSearching(true)
      }
      setText(inputValue)
    }
    return (
      <nav className="bg-gray-50 p-4 flex justify-between border border-down">
        <div className="flex items-center">
          <span className=" text-3xl font-bold">Buyer Dashboard</span>
        </div>
        <div className=" flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search Products..."
            className="md:w-[100px] lg:w-[1000px]"
            value={text}
            onChange={handleSearch}
          />
          {/* <Button type="submit"><SearchIcon/></Button> */}
        </div>
        <div className="flex items-center space-x-4">
          <Button size="sm" onClick={()=>{router.push("/cart")}}><ShopCart/></Button>
          <Button size="sm" onClick={handleLogout}>Logout</Button>
        </div>
      </nav>
    )
  }
  