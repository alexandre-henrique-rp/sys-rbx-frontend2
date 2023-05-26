import { Flex, useToast } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from '../elements/menu';
import Loading from '../elements/loading';


function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  const toast = useToast();
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loading size="200px">Carregando...</Loading>;
  }

  if (!session) {
    if (router.asPath === '/auth/verify-request') {
      return <>{children}</>;
    } else if (router.asPath === '/auth/signin') {
      return <>{children}</>;
    } else if (router.asPath === '/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000&error=CredentialsSignin') {
      toast({
        title: 'Email ou senha incorreto',
        description: 'As credenciais que você está usando são inválidas.',
        status: 'error',
        duration: 7000,
        position: 'top-right',
        isClosable: true,
      });
      return <>{children}</>;
    }else if (router.asPath === '/') {
      router.push('/auth/signin');
      return <Loading size="200px">Redirecionando...</Loading>;
    }else if (router.asPath !== '/auth/signin') {
      router.push('/auth/signin');
    }
    router.push('/auth/signin');
  }

  if (!status) {
    if (router.asPath === '/auth/verify-request') {
      return <>{children}</>;
    } else if (router.asPath === '/auth/signin') {
      return <>{children}</>;
    } else if (router.asPath === '/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000&error=CredentialsSignin') {
      toast({
        title: 'Email ou senha incorreto',
        description: 'As credenciais que você está usando são inválidas.',
        status: 'error',
        duration: 7000,
        position: 'top-right',
        isClosable: true,
      });
      return <>{children}</>;
    }else if (router.asPath === '/') {
      router.push('/auth/signin');
      return <Loading size="200px">Redirecionando...</Loading>;
    }else if (router.asPath !== '/auth/signin') {
      router.push('/auth/signin');
    }
    router.push('/auth/signin');
  }

  if (router.asPath === '/auth/signin#') {
    router.push('/auth/signin');
    return <Loading size="200px">Redirecionando...</Loading>;
  }
  
  if (session && router.asPath === '/auth/signin'){
    router.push('/');
    return <Loading size="200px">Redirecionando...</Loading>;
  }

  return (
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
  );
}


export default Layout;
