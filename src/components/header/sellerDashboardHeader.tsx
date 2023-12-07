import { useState } from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { deleteAuthToken } from "@/context/AuthStorage"

export default function SellerDashboardHeader() {
  const router = useRouter();
    async function handleLogout() {
        deleteAuthToken()
        router.push('/')
    }
    return (
      <nav className="bg-gray-50 p-4 flex justify-between border border-down">
        <div className="flex items-center">
          <span className=" text-3xl font-bold">Seller Dashboard</span>
        </div>
        <div className="items-center space-x-4">
          <Button size="sm" onClick={handleLogout}>Logout</Button>
        </div>
      </nav>
    )
  }
  