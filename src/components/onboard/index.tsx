'use client';
import { addUserInfo } from "@/graphql/mutations";
import { Button } from "../ui/button";
import react from 'react'
import { toast } from "../ui/use-toast";
export default function Onboard() {
    const [fname, setFname] = react.useState("")
    const [lname, setLname] = react.useState("")
    const [phone, setPhone] = react.useState("")
    const [dob, setDob] = react.useState("")
    async function handleOnboard() {
        try {
            const response = await addUserInfo({
                first_name: fname, 
                last_name: lname, 
                dob: dob, 
                phone_number: phone
            },{})
            console.log(response)
            if ('data' in response && response.data?.data?.addUserInfo) {
                const {message, status} = response.data?.data?.addUserInfo;
                // Now you can use 'message' and 'status' as needed
                console.log("Message:", message);
                console.log("Status:", status);
                // Add your logic here based on the response data
                if (status === 201){
                    toast({
                        variant: "default",
                        title: "Verified User",
                        description: message
                    })
                    location.reload()
                } else {
                    toast({
                        variant: "destructive",
                        title: "Error: Status "+ status,
                        description: message
                    })
                }
              } else {
                console.error("GraphQL response is missing data:", response);
                console.log(response);
              }
            
        }catch(error) {
            // Handle errors here
            console.error("Error:", error);
        }
    }
    return (
      <div>
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold text-black mb-4 text-center">Onboard Yourself!</h2>
                <input
                    type="text"
                    placeholder="Firstname"
                    value={fname}
                    onChange={(e)=> setFname(e.currentTarget.value)}
                    className="w-full p-2 border rounded mb-4 mt-4 text-black"
                />
                <input
                    type="text"
                    placeholder="Lastname"
                    value={lname}
                    onChange={(e)=> setLname(e.currentTarget.value)}
                    className="w-full p-2 border rounded mb-4 mt-4 text-black"
                />
                <input
                    type="text"
                    placeholder="Date of Birth (YYYY-MM-DD)"
                    value={dob}
                    onChange={(e)=> setDob(e.currentTarget.value)}
                    className="w-full p-2 border rounded mb-4 mt-4 text-black"
                />
                <input
                    type="text"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e)=> setPhone(e.currentTarget.value)}
                    className="w-full p-2 border rounded mb-4 mt-4 text-black"
                />
                <Button className="w-full bg-black text-white py-2 rounded" onClick={handleOnboard}>
                    Update Information
                </Button>
            </div>
        </div>
      </div>
    )
  }

function useState(arg0: string): [any, any] {
    throw new Error("Function not implemented.");
}
  