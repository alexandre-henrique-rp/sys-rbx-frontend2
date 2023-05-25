'use client'
import { useSession } from "next-auth/react";


const getUser = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession()
  return session?.user.email.replace(/\"/g, '')
}

export default function Produtos() {
  const Email = getUser()
  const Token = 'b29cda672c7240256e46b7d68924e320';
  const url: string = `http://ribermax.com?Token=${Token}&Email=${Email}`
  
  return (
    <>
      <iframe
        src={url}
        height="100%"
        width={'100%'}
      />
    </>
  )
}