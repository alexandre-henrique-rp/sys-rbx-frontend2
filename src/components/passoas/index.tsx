import { Box, Button, Flex, FormLabel, Input } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import CardPessoas from './card'


export const BodyPessoa = (props: {data: any}) =>{
  const [pesquisa, sePesquisa] = useState('')
  const [pessoas, sePessoas] = useState([])
  const {push}= useRouter()

  useEffect(()=>{
    sePessoas(props.data)
  }, [props.data])

  const LowerBusca = pesquisa.toLowerCase()

  const pessoaFilter: any = pessoas.filter((E: any) => {
    const nome = E.attributes.nome
    return nome.toLowerCase().includes(LowerBusca)
  })

  return (
    <>
     <Flex h="100vh" w="100%" flexDir={"column"} justifyContent="center">
        <Flex
          w={"100%"}
          borderBottom={"2px"}
          borderColor={"gray.200"}
          py={'1rem'}
          px={'3rem'}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDir={{ sm: "column", md: "row" }}
        >
          <Flex gap="1rem" alignItems={"center"} w={{ sm: "100%", md: "50%" }}>
            <FormLabel
              fontSize="lg"
              fontWeight="md"
              color="gray.700"
              textTransform="capitalize"
              letterSpacing="wide"
            >
              Busca por empresa
            </FormLabel>
            <Input
              type="text"
              borderColor="gray.600"
              focusBorderColor="brand.400"
              size="md"
              w="19rem"
              fontSize="md"
              rounded="md"
              onChange={(e) => sePesquisa(e.target.value)}
              value={pesquisa}
            />

          </Flex>
          <Box
            display={"flex"}
            gap={3}
            h="100%"
            justifyContent={'center'}
            alignItems="center"
            flexWrap={'wrap'}
          >
            <Button
              colorScheme="whatsapp"
              fontSize={'0.8rem'}
              onClick={() => push("/empresas/cadastro")}
            >
              Cadastrar Empresa
            </Button>
            <Button fontSize={'0.8rem'} colorScheme="cyan" onClick={() => push('/pessoas/cadastro')}>Add Nova Pessoa</Button>
          </Box>
        </Flex>
        <Box h={"95%"} bg="#edf3f8" overflow={"auto"}>
          <Flex py={50} flexWrap={'wrap'} gap='' justifyContent={"center"} px={5} w="full">
            <Suspense fallback={<div>Carregando dados...</div>}>
              <CardPessoas data={pessoaFilter} />
            </Suspense>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}