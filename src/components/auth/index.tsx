import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { Providers } from "../providers";
import { Ubuntu } from "next/font/google";
import { Flex } from "@chakra-ui/react";


const inter = Ubuntu({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})


interface IProps {
  children: React.ReactNode;
}

export const AuthProtected = ({ children }: IProps) => {
  const pathName = usePathname();
  const { data: session, status } = useSession({ required: true })
  console.log("🚀 ~ file: index.tsx:23 ~ AuthProtected ~ session:", session)

  if (!session && !status) {
    redirect('/auth/signin')
  }

  if (session && pathName === '/auth/signin') {
    redirect('/home')
  }
  // if (!session && pathName !== '/auth/signin') {
  //   redirect('/auth/signin')
  // }

  if (
    pathName ===
    '/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fhome&error=CredentialsSignin'
  ) {
    redirect('/auth/signin');
  }

  return (
    <>{children}</>
  )
}