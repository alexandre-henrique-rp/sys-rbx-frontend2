"use client";
import Navbar from "@/components/menu/Index";
import { Ubuntu } from 'next/font/google'
import { Flex } from "@chakra-ui/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Providers } from "@/components/providers";
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { AuthProtected } from "@/components/auth";
import { checkIsPublicRoute } from "@/functions/check-is public-route";



const inter = Ubuntu({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

interface IProps {
  children: React.ReactNode;
  session: Session
}


export default function RootLayout({ children, session }: IProps) {
  
  const pathname = usePathname();
  const { push } = useRouter()

  const isPublicPage = checkIsPublicRoute(pathname!);
  console.log("🚀 ~ file: layout.tsx:31 ~ RootLayout ~ isPublicPage:", isPublicPage)

  if (
    pathname ===
    '/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fhome&error=CredentialsSignin'
  ) {
    push('/auth/signin');
  }

  return (


    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <Flex
            h={'100vh'}
            flexDir={['column', 'column', 'row']}
            overflow="hidden"
            maxW="2000px"
            fontSize={'0.5rem'}
          >
            {isPublicPage && children}
            {!isPublicPage && (
              <>
                <SessionProvider session={session}>
                  <AuthProtected>
                    <Flex
                      alignItems="center"
                      bg="gray.700"
                      flexDir="column"
                      minW="150px"
                      w={['100%', '100%', '15%', '15%', '15%']}
                    >
                      <Navbar />
                    </Flex>
                    <Flex
                      flexDir="column"
                      minH="100vh"
                      overflow="auto"
                      w={{ sm: '100%', md: '85%' }}
                      h={'100%'}
                    >
                      {children}
                    </Flex>
                  </AuthProtected >
                </SessionProvider>
              </>
            )}
          </Flex>
        </Providers>
      </body>
    </html>


  )
}
