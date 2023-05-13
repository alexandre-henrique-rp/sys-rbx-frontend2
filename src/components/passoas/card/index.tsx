import { Box, Flex, chakra, Icon, useToast, Link } from "@chakra-ui/react";
import { mask } from "remask";
import { SiWhatsapp } from "react-icons/si";
import { RiPhoneFill } from 'react-icons/ri';
import { memo } from "react";


const CardPessoas = (props: {
  data: any
}) => {
  const toast = useToast()
  const { data } = props

  return (
    <>
      {data.map((i: any) => {
        const id = i.id
        const nome = i.attributes.nome
        const celular = i.attributes.whatsapp
        console.log("🚀 ~ file: index.tsx:23 ~ {data.map ~ responsavel:", i.attributes.whatsapp )
        return (
          <>
            <Box
              mx="auto"
              px={8}
              py={5}
              mb={5}
              rounded="lg"
              shadow="lg"
              boxShadow="dark-lg"
              bg="white"
              w={'20rem'}
              fontSize="sm"
              key={id}
            >
              <Flex flexDirection={'column'}>
                <Link
                  fontSize="md"
                  color="gray.700"
                  fontWeight="700"
                  mr={3}
                  mb={3}
                  href={`/pessoas/${id}`}
                >
                  {nome}
                </Link>
                <chakra.p
                  fontSize="10px"
                >
                 
                </chakra.p>
                <Flex gap={3}>
                </Flex>
                {!celular ? null : (
                  <>
                    <Box mt={3}>
                      <Link
                        fontSize="12px"
                        color="gray.700"
                        fontWeight="700"
                        href={'https://wa.me/55' + celular}
                      >
                        <Icon as={SiWhatsapp} />{' '}
                        {mask(celular, ['(99) 9 9999-9999'])}
                      </Link>
                    </Box>
                  </>
                )}
              </Flex>
            </Box>
          </>
        )
      })}

    </>
  )
}

export default memo(CardPessoas)