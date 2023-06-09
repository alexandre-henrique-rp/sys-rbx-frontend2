'use client'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Link, Stack, useToast } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";


export default function Auth(): JSX.Element {

  const [user, setUser] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res: any = await signIn('credentials', {
      Username: user,
      Password: pass,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <Stack
      minH={'100vh'}
      minW={'100vw'}
      direction={{ base: 'column', md: 'row' }}
    >
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>CRM Ribermax</Heading>
          <Box>
            <FormControl>
              <FormLabel htmlFor="email">Usuario</FormLabel>
              <Input
                borderColor="gray.400"
                name="email"
                type="text"
                onChange={(e) => setUser(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <Input
                borderColor="gray.400"
                name="password"
                type="password"
                onChange={(e) => setPass(e.target.value)}
              />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Link color={'blue.500'} fontSize={'10px'}>Esqueceu sua senha?</Link>
              </Stack>
              <Button colorScheme={'blue'} variant={'solid'} onClick={handleSubmit}>
                Login
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  )
}
