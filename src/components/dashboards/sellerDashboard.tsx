import react from "react"
import SellerDashboardHeader from "../header/sellerDashboardHeader"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import MyProducts from "../screens/myProducts"
export default function SellerDashboard() {
    
    react.useEffect(()=>{
        
    })
    return (
        <div>
        <SellerDashboardHeader isEnlisting={false}/>
        <div className=" flex py-10 justify-center">
            <Tabs defaultValue="myproducts" className="w-full mx-20">
                <TabsList>
                    <TabsTrigger value="myproducts"> My Products</TabsTrigger>
                    <TabsTrigger value="pending">Pending Orders</TabsTrigger>
                    <TabsTrigger value="fulfilled">Fulfilled Orders</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled Orders</TabsTrigger>
                </TabsList>
                <TabsContent value="myproducts">
                    <MyProducts/>
                </TabsContent>
                <TabsContent value="pending">

                </TabsContent>
                <TabsContent value="fulfilled">

                </TabsContent>
                <TabsContent value="cancelled">

                </TabsContent>
            </Tabs>
        </div>
        </div>
      
    )
  }
  