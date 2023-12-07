'use client';
import { Loader } from "@/components/loader.tsx";
import Onboard from "@/components/onboard";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/context/AuthStorage";
import { isOnboarded } from "@/graphql/queries"
import { useEffect, useState } from "react"
import { CheckAuth } from "@/lib/helper";
import SellerDashboard from "@/components/dashboards/sellerDashboard";
import BuyerDashboard from "@/components/dashboards/buyerDashboard";
const jwt = require('jsonwebtoken')
export default function Dashboard() {
  // ALL DIFFERENT DASHBOARDS ARE SELECTED HERE
  const [isUserOnboarded, setIsOnboarded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [role, setRole] = useState("")
  const router = useRouter();
  async function CheckOnboarded() {
    try {
        const response = await isOnboarded({})
        console.log(response)
        if ('data' in response && response.data?.data?.isOnboarded) {
            const {message, status} = response.data?.data?.isOnboarded;
            // Now you can use 'message' and 'status' as needed
            console.log("Message:", message);
            console.log("Status:", status);
            // Add your logic here based on the response data
            if (status === 200){
                setIsOnboarded(true)
            }
            setIsLoading(false)
        } else {
            console.error("GraphQL response is missing data:", response);
            console.log(response);
        }
    }catch(error) {
        console.error("Error:", error);
    }
  }
  let payload;
  useEffect(()=> {
    let isAUTHENTICATED = CheckAuth()
    if (!isAUTHENTICATED){
        router.push('/login')
    }
    CheckOnboarded()
    if (isUserOnboarded) {
      const token = getAuthToken()
      payload = jwt.decode(token)
      setRole(payload?.role)
    }
  })
  return (
    <div>
        {
            isLoading ? <Loader/>:
            !isUserOnboarded ? <Onboard/>:
            role === "seller"? <SellerDashboard/>:
            role === "buyer" ? <BuyerDashboard/>:
            <Loader/>
        }
    </div>
  )
}
