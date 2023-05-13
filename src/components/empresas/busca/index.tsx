import { Box, Button, Flex, FormLabel, Input, chakra } from "@chakra-ui/react"
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useMemo, useState } from "react"
import  CardEmpresas  from "./card";


export const BuscaEmpresa = (props: { data: any }) => {
  const router = useRouter();
  const [pesqisa, sePesquisa] = useState('')
  console.log("🚀 ~ file: index.tsx:11 ~ BuscaEmpresa ~ pesqisa:", pesqisa)

  function ElementFilter(Filtro: SetStateAction<string>) {
    sePesquisa(Filtro);
  }
  const Empresas = props.data
  console.log("🚀 ~ file: index.tsx:18 ~ BuscaEmpresa ~ Empresas:", Empresas)

  const empresaFilter: any = useMemo(() => {
    const LowerBusca = pesqisa.toLowerCase()
    return Empresas.filter((E: any) => {
      const nome = E.attributes.nome
      return nome.toLowerCase().includes(LowerBusca)
    })
  }, [pesqisa, Empresas])

 

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
           <Flex gap="1rem" alignItems={"center"} w={{ sm: "100%", md: "35%" }}>
            <FormLabel
              w='25rem'
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
              w="35rem"
              fontSize="md"
              rounded="md"
              onChange={(e) => sePesquisa(e.target.value)}
              value={pesqisa}
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
              onClick={() => router.push("/empresas/cadastro")}
            >
              Cadastrar Empresa
            </Button>
            <Button fontSize={'0.8rem'} colorScheme="cyan" onClick={() => router.push('/pessoas/cadastro')}>Add Nova Pessoa</Button>
          </Box>
        </Flex>
        <Box h={"95%"} bg="#edf3f8" overflow={"auto"}>
          <Flex py={50} flexWrap={'wrap'} gap='' justifyContent={"center"} px={5} w="full">
            <CardEmpresas data={empresaFilter} />
          </Flex>
        </Box>
      </Flex>
    </>
  )
}