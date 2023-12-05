import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4 mt-4 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4 text-black"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded mb-4 text-black"
        />
        <Select>
          <SelectTrigger className="w-full mb-5">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buyer">Buyer</SelectItem>
            <SelectItem value="seller">Seller</SelectItem>
          </SelectContent>
        </Select>

        <Button className="w-full bg-black text-white py-2 rounded">
          Sign up
        </Button>
        <div className='text-center mt-4'>
          <Link href='/login' className='text-black text-center'>Already have an account? Signin now!</Link>
        </div>
      </div>
    </div>
  )
}
