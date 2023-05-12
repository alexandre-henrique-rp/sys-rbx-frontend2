
'use client'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

interface PropsLogin {
  children: React.ReactNode;
}

export function Providers({
  children
}: PropsLogin) {

  return (
    <CacheProvider>
      <ChakraProvider>
          {children}
      </ChakraProvider>
    </CacheProvider>

  )
}