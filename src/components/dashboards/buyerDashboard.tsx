import {useEffect, useState} from "react";
import BuyerDashboardHeader from "../header/buyerDashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Catalog from "../screens/buyerScreens/catalog";
import { Product } from "@/types/graphql";

export default function BuyerDashboard() {
  const [isSearching, setIsSearching] = useState(false)
  const [text, setText] = useState("")
  const [searchList, setSearchList] = useState<Product[]>([])
  useEffect(() => {},[]);
  return (
    <div>
      <BuyerDashboardHeader isSearching={isSearching} setIsSearching={setIsSearching} text={text} setText={setText} setSearchList={setSearchList}/>
      {/* optional search section */}

      {/* buyer tabs section */}
      <div className=" flex py-10 justify-center">
        <Tabs defaultValue="catalog" className="w-full mx-20">
          <TabsList>
            <TabsTrigger value="catalog">Catalog</TabsTrigger>
            <TabsTrigger value="orders">Pending Orders</TabsTrigger>
            <TabsTrigger value="fulfilled">Fulfilled Orders</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="catalog">
            <Catalog/>
          </TabsContent>
          <TabsContent value="pending"></TabsContent>
          <TabsContent value="fulfilled"></TabsContent>
          <TabsContent value="cancelled"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
