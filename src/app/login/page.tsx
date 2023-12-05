import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">Sign In</h2>
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
        <Button className="w-full bg-black text-white py-2 rounded">
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