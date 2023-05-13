
"use client"
import { Heading } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { Suspense } from "react";

const getUser = () =>{
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession()
  return session?.user
}

export default function Home() {
  
  const user = getUser()
  return (
    <>

      <Heading>Home</Heading>
      <Suspense fallback={<div>Carregando ....</div>}> 
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
      </Suspense>
    </>
  )
}
