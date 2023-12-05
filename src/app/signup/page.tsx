'use client'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { registerAccount } from '@/graphql/mutations'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'


export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"buyer"| "seller">("buyer")
  
  async function handleSignUp(){
    // logic
    const response = await registerAccount({email, password, role})
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">Sign Up</h2>
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
        {/* <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded mb-4 text-black"
        /> */}
        <Select value={role} onValueChange={(value: "buyer"| "seller")=> setRole(value)}>
          <SelectTrigger className="w-full mb-5">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buyer">Buyer</SelectItem>
            <SelectItem value="seller">Seller</SelectItem>
          </SelectContent>
        </Select>

        <Button className="w-full bg-black text-white py-2 rounded" onClick={handleSignUp}>
          Sign up
        </Button>
        <div className='text-center mt-4'>
          <Link href='/login' className='text-black text-center'>Already have an account? Signin now!</Link>
        </div>
      </div>
    </div>
  )
}
