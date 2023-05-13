'use client'

import { APP_ROUTES } from "@/constants/app-routes";
import { checkUserAuthenticated } from "@/functions/check-is public-route/checkUserAuthenticated";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";


interface IProps {
  children: React.ReactNode;
}


export const AuthProtected = ({ children }: IProps) => {
  const pathName = usePathname();
  const { push } = useRouter()
  
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin')
    }
  })
  const isUserAuthenticated = !!status;

  useEffect(
    () => {
      if (status === "loading") {
        console.log( "Loading or not authenticated...")
      }
      // if (!isUserAuthenticated) {
      //   push('/auth/signin')
      // }
    },
    [isUserAuthenticated, pathName, push, status]
  )

  return (
    <>
      {!isUserAuthenticated && null}
      {isUserAuthenticated && children}
    </>
  )
}