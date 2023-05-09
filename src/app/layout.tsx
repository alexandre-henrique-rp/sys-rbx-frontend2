"use client";
import Navbar from "@/components/menu/Index";
import { Ubuntu } from 'next/font/google'
import { Flex } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { Providers } from "./providers";


const inter = Ubuntu({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

interface IProps {
  children: React.ReactNode;

}

export default function RootLayout({ children }: IProps) {
  const { push } = useRouter();
  const pathname = usePathname();

  if (pathname === '/auth/login') {
    return (
      <>
        <html lang="pt-BR">
          <body className={inter.className}>
            <Providers>
              <Flex
                h={'100vh'}
                flexDir={['column', 'column', 'row']}
                overflow="hidden"
                maxW="2000px"
                fontSize={'1rem'}
              >
                {children}
              </Flex>
            </Providers>
          </body>
        </html>
      </>
    );
  }

  if (
    pathname ===
    '/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000&error=CredentialsSignin'
  ) {
    push('/auth/login');
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
            fontSize={'1rem'}
          >
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
          </Flex>
        </Providers>
      </body>
    </html>
  )
}
