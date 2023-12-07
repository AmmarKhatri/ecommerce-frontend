'use client';
import react from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { CheckAuth } from "@/lib/helper";

const HomePageHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = react.useState(false)
  const [loadingAuth, setLoadingAuth] = react.useState(true)
  react.useEffect(()=> {
    let isAUTHENTICATED = CheckAuth()
    console.log("Called check auth: "+isAUTHENTICATED)
    if (isAUTHENTICATED){
        setIsLoggedIn(true)
    } 
    setLoadingAuth(false)
  })
  return (
    <nav className="bg-gray-50 p-4 flex justify-between border border-down">
      <div className="flex items-center">
        <span className=" text-3xl font-bold">Ecommerce Store</span>
      </div>
      <div className="items-center space-x-4">
        {
          loadingAuth ? "": !isLoggedIn ? (
            <>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
              <Link href="/login">
                <Button size="sm" variant="outline">
                  Log In
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          )
        }
      </div>
    </nav>
  );
};

export default HomePageHeader;
