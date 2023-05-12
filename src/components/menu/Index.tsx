"use client"
import {
  Center,
  Flex,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import React from 'react';
import NavMenuItems from './menuItens';
import ProfilePopover from './profile-popover';
import { useSession } from 'next-auth/react';

function Navbar() {
  
  const pathName = usePathname();
  const { push } = useRouter()

  
  return (
    <Flex
      flexDir="column"
      h="100vh"
      justifyContent="space-between"
      display={['none', 'none', 'flex', 'flex', 'flex']}
    >
      <Flex flexDir="column" as="nav">
        <Image
          rounded="5px"
          w="80%"
          m="10%"
          bg={'white'}
          p={3}
          src="https://ribermax.com.br/images/logomarca-h.webp?w=1080&q=75"
          alt="Ribermax Logomarca"
        />
        <Flex flexDir="column" m="10%">
          <List spacing={5}>
            {NavMenuItems.map((navItem: any) => (
              <ListItem key={`navbar-${navItem.id}`}>
                <Text>
                  <ListIcon fontSize="2xl" color="greenyellow" as={navItem.icon} />
                    <Link
                    onClick={()=> push(navItem.url)}
                      fontSize="lg"
                      color={
                        pathName === navItem.url
                          ? 'greenyellow'
                          : 'whiteAlpha.800'
                      }
                    >
                      {navItem.text}
                    </Link>
                </Text>
              </ListItem>
            ))}
          </List>
        </Flex>
      </Flex>

      <Center my="15px">
        <ProfilePopover />
      </Center>
    </Flex>
  );
}
export default Navbar;
