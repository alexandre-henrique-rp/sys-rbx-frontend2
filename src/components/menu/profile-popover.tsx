import {
  Avatar,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { RiExternalLinkFill } from 'react-icons/ri';

const getUser = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession()
  return session
}

const ProfilePopover = () => {
  const session = getUser();

  return (
    <>
      {session && (
        <Popover>
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <Button
                  borderRadius="full"
                  w="56px"
                  h="56px"
                  bg="transparent"
                  _hover={{ bg: 'gray.400' }}
                >
                  <Avatar
                    name={session.user.name}
                    src={session.user.image}
                    size="md"
                  />
                </Button>
              </PopoverTrigger>

              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>{session.user.name}</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <NextLink href="/perfil">
                      <Button bg="transparent" onClick={onClose}>
                        Meu perfil
                      </Button>
                    </NextLink>
                  </PopoverBody>
                  <PopoverFooter>
                    <Flex justifyContent="flex-end">
                      <Button
                        bg="red.200"
                        rightIcon={<RiExternalLinkFill />}
                        onClick={() => signOut({ redirect: true, callbackUrl: '/auth/signin' })}
                      >
                        Sair
                      </Button>
                    </Flex>
                  </PopoverFooter>
                </PopoverContent>
              </Portal>
            </>
          )}
        </Popover>
      )}
    </>
  );
};
export default ProfilePopover;
