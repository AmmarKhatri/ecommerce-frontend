'use client';
import BuyerDashboardHeader from "@/components/header/buyerDashboardHeader";
import { getAddresses } from "@/graphql/queries";
import { useEffect, useState } from "react";
import { Address } from "@/types/graphql";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Bin from "@/components/extras/bin";
import { addAddress, removeAddress } from "@/graphql/mutations";

export default function Addresses() {
    const [add, setAdd] = useState<Address[]>([])
    const [postal, setPostal] = useState<number>(0)
    const [line1, setLine1] = useState<string>("")
    const [line2, setLine2] = useState<string>("")
    const [city, setCity] = useState<string>("")
    async function fetchAddresses(){
        const response = await getAddresses({})
        if ('data' in response && response.data.data?.getAddresses) {
            const {message, status, addresses} = response.data.data?.getAddresses;
            // Now you can use 'message' and 'status' as needed
            console.log("Message:", message);
            console.log("Status:", status);
            // Add your logic here based on the response data
            if (status !== 201){
              toast({
                variant: "destructive",
                title: "Error: Status "+ status,
                description: message
              })
            } else {
                console.log(addresses)
                setAdd([...addresses])
            }
          } else {
            console.error("GraphQL response is missing data:", response);
            console.log(response);
          }
    }
    async function handleAddAddress(){
        if(postal === 0 || line1 === "" || city === ""){
            toast({
                variant: "destructive",
                title: "Invalid Fields",
                description: "Please input correct fields"
            })
        } else {
            const response = await addAddress({add1: line1, add2: line2, city, postal_code: postal},{})
            if ('data' in response && response.data.data?.addAddress) {
                const {message, status} = response.data.data?.addAddress;
                // Now you can use 'message' and 'status' as needed
                console.log("Message:", message);
                console.log("Status:", status);
                // Add your logic here based on the response data
                if (status !== 201){
                toast({
                    variant: "destructive",
                    title: "Error: Status "+ status,
                    description: message
                })
                } else {
                    fetchAddresses()
                }
            } else {
                console.error("GraphQL response is missing data:", response);
                console.log(response);
            }
        }
        
    }
    async function handleRemoveAddress(id: number){
        const response = await removeAddress({id},{})
            if ('data' in response && response.data.data?.removeAddress) {
                const {message, status} = response.data.data?.removeAddress;
                // Now you can use 'message' and 'status' as needed
                console.log("Message:", message);
                console.log("Status:", status);
                // Add your logic here based on the response data
                if (status !== 201){
                toast({
                    variant: "destructive",
                    title: "Error: Status "+ status,
                    description: message
                })
                } else {
                    fetchAddresses()
                }
            } else {
                console.error("GraphQL response is missing data:", response);
                console.log(response);
            }
    }
    useEffect(()=>{
        fetchAddresses()
    }, [])
    return(<>
        <BuyerDashboardHeader/>
            <div className="flex pt-20 items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
              <h2 className="text-2xl font-bold text-black mb-4 text-center">Add Address</h2>
              <input
                type="number"
                placeholder="Postal Code"
                value={postal}
                onChange={(e)=> setPostal(parseInt(e.currentTarget.value))}
                className="w-full p-2 border rounded mb-4 mt-4 text-black"
              />
              <input
                type="text"
                placeholder="Address Line 1"
                value={line1}
                onChange={(e)=> setLine1(e.currentTarget.value)}
                className="w-full p-2 border rounded mb-4 text-black"
                />
                <input
                type="text"
                placeholder="Address Line 2"
                value={line2}
                onChange={(e)=> setLine2(e.currentTarget.value)}
                className="w-full p-2 border rounded mb-4 text-black"
                />
                <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e)=> setCity(e.currentTarget.value)}
                className="w-full p-2 border rounded mb-4 text-black"
                />
              <Button className="w-full bg-black text-white py-2 rounded" onClick={handleAddAddress}>
                Add
              </Button>
            </div>
          </div>
          {add.length !== 0 ?<div className=" p-20"><Table>
        <TableCaption> All your registered addresses</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead className="w-[100px]">Postal Code</TableHead>
                    <TableHead className="w-[150px]">Line1</TableHead>
                    <TableHead>Line2</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className=" text-center">Remove</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {
                add.map((address, i) =>(
                    <TableRow key={address.id}>
                        <TableCell className=" text-center">{address.id}</TableCell>
                        <TableCell className=" text-center">{address.postal_code}</TableCell>
                        <TableCell>{address.add1}</TableCell>
                        <TableCell>{address.add2}</TableCell>
                        <TableCell>{address.city}</TableCell>
                        <TableCell>{address.created_at}</TableCell>
                        <TableCell className="w-[100px] text-center">
                                <Button className="sm bg-red-400" onClick={()=>{handleRemoveAddress(address.id)}}>
                                    <Bin/>
                                </Button>
                            </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table></div>: <div className=" text-center text-gray-700 mt-96 font-bold">You have no addresses to show</div>}
    </>)
}