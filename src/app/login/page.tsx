'use client';
const jwt = require('jsonwebtoken')
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { setAuthToken } from '@/context/AuthStorage';
import { loginUser } from '@/graphql/mutations';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { useState } from 'react';
require('dotenv').config();
export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  async function handleSignIn(){
    // logic
    try {
    const response = await loginUser({ email, password });
    if ('data' in response && response.data.data?.loginUser) {
        const {message, status, token} = response.data.data?.loginUser;
        // Now you can use 'message' and 'status' as needed
        console.log("Message:", message);
        console.log("Status:", status);
        let payload
        if (token){ //set token in localStorage
          setAuthToken(token)
          payload = jwt.decode(token)
          console.log("Token:" + payload.role)
        }
        // Add your logic here based on the response data
        if (status !== 201){
          console.log("Toast executed")
          toast({
            variant: "destructive",
            title: "Error: Status "+ status,
            description: message
          })
        } else {

          let mymsg =  message+". Welcome, "+payload?.role
          toast({
            variant: "default",
            title: "Logged in Successfully",
            description: mymsg
          })
          // reroute to login
          router.push('/dashboard');
        }
      } else {
        console.error("GraphQL response is missing data:", response);
        console.log(response);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  }
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">Sign In</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e)=> setEmail(e.currentTarget.value)}
          className="w-full p-2 border rounded mb-4 mt-4 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=> setPassword(e.currentTarget.value)}
          className="w-full p-2 border rounded mb-4 text-black"
          />
        <Button className="w-full bg-black text-white py-2 rounded" onClick={handleSignIn}>
          
          Login
        </Button>
        <div className='text-center mt-4'>
            <Link href='/signup' className='text-black'>
              Haven't signed up? Signup now!
            </Link>
        </div>
      </div>
    </div>
  );
}