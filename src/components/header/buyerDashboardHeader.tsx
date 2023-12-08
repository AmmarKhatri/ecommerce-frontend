'use client'
import { useState } from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { deleteAuthToken } from "@/context/AuthStorage"
import ShopCart from "../extras/shopCart";

export default function BuyerDashboardHeader() {
  const router = useRouter();
    async function handleLogout() {
        deleteAuthToken()
        router.push('/')
    }
    return (
      <nav className="bg-gray-50 p-4 flex justify-between border border-down">
        <div className="flex items-center">
          <span className=" text-3xl font-bold">Buyer Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button size="sm" onClick={()=>{router.push("/cart")}}><ShopCart/></Button>
          <Button size="sm" onClick={handleLogout}>Logout</Button>
        </div>
      </nav>
    )
  }
  