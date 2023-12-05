"use client";
import React, {
  useState,
  createContext,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

import { CurrentToken } from "@/lib/local-storage";

interface Tokens {
  accessToken?: string;
}

interface AuthContext {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const initialAuthContext: AuthContext = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};

const AuthContext = createContext<AuthContext>(initialAuthContext);

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { accessToken }: Tokens = new CurrentToken().get();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(accessToken));
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Boolean(accessToken));
  }, [accessToken]);

  // You can uncomment and implement the user fetching logic here if needed
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     setLoadingAuth(true);
  //     // Your logic for fetching user data here
  //     setLoadingAuth(false);
  //   }
  // }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuthContext };
