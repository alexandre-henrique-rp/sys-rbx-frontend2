import { Box, Flex, chakra, Icon, useToast, Link, Spinner } from "@chakra-ui/react";
import { mask } from "remask";
import { SiWhatsapp } from "react-icons/si";
import { RiPhoneFill } from 'react-icons/ri';
import { Suspense, memo } from "react";


const CardEmpresas = (props: {
  data: any
}) => {
  const toast = useToast()
  const { data } = props

  return (
    <>
      {data.map((i: any) => {
        const id = i.id
        const nome = i.attributes.nome
        const CNPJ = i.attributes.CNPJ
        const celular = i.attributes.celular
        const telefone = i.attributes.fone
        const responsavel = i.attributes.responsavel.data?.attributes.nome
        return (
          <>
            <Suspense fallback={<Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />}>
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
                    href={`/empresas/${id}`}
                  >
                    {nome}
                  </Link>
                  <chakra.p
                    fontSize="10px"
                  >
                    {mask(CNPJ, ['99.999.999/9999-99'])}
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
                  {!telefone || telefone === "" ? null : (
                    <>
                      <Box mt={3}>
                        <Link
                          fontSize="12px"
                          color="gray.700"
                          fontWeight="700"
                          onClick={() => {
                            navigator.clipboard.writeText(telefone);
                            toast({
                              title: 'Telefone copiado',
                              position: 'top-right',
                              duration: 1000,
                            });
                          }}
                        >
                          <Icon as={RiPhoneFill} />{' '}
                          {mask(telefone, [
                            '(99) 9999-9999',
                            '(99) 9 9999-9999',
                          ])}
                        </Link>
                      </Box>
                    </>
                  )}
                  <chakra.span>{responsavel}</chakra.span>
                </Flex>
              </Box>
            </Suspense>
          </>
        )
      })}

    </>
  )
}

export default memo(CardEmpresas)