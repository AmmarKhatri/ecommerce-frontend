import react from "react"
import SellerDashboardHeader from "../header/sellerDashboardHeader"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
export default function SellerDashboard() {
    
    react.useEffect(()=>{
        
    })
    return (
        <div>
        <SellerDashboardHeader/>
            <Tabs defaultValue="myproducts" className="w-[600px]">
                <TabsList>
                    <TabsTrigger value="myproducts"> My Products</TabsTrigger>
                    <TabsTrigger value="pending">Pending Orders</TabsTrigger>
                    <TabsTrigger value="fulfilled">Fulfilled Orders</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled Orders</TabsTrigger>
                </TabsList>
            </Tabs>

        </div>
      
    )
  }
  