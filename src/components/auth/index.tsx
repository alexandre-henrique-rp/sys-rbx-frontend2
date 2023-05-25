'use client'

import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface IProps {
  children: React.ReactNode;
}



export const AuthProtected = ({ children }: IProps) => {
  const pathName = usePathname();
  const { push } = useRouter()
  const [user, setUser] = useState(false)
  const toast = useToast()
  
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin')
    }
  })
  const isUserAuthenticated = user;

  useEffect(
    () => {
      
      if (status === "loading") {
        console.log( "Loading or not authenticated...")
      }
      setUser(!!session)
    },
    [isUserAuthenticated, pathName, push, session, status, toast]
  )
 
  return (
    <>
      {!isUserAuthenticated && null}
      {isUserAuthenticated && children}
    </>
  )
}