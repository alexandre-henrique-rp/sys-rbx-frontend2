import { useRouter } from "next/router";
import { Box, Button, Flex, FormLabel, Input, Select } from "@chakra-ui/react";
import { Suspense, useEffect, useState } from "react";
import CardEmpresas from '@/component/empresas/fragment/card';
import Loading from "@/component/elements/loading";


function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [pesquisa, sePesquisa] = useState('')
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()

  useEffect(() => {
    (async () => {
      setLoading(true)
      const response = await fetch('/api/empresas/get/list_empresas');
      const data = await response.json();
      setEmpresas(data);
      setLoading(false)
    })()
  }, [])
  
  const LowerBusca = pesquisa.toLowerCase()

  const empresaFilter: any = empresas.filter((E: any) => {
    const nome = E.attributes.nome
    return nome.toLowerCase().includes(LowerBusca)
  })

  if (loading) {
    return <Loading size="200px">Carregando...</Loading>;
  }

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
            <Button fontSize={'0.8rem'} colorScheme="cyan" onClick={() => push('/pessoas/criar')}>Add Nova Pessoa</Button>
          </Box>
        </Flex>
        <Box h={"95%"} bg="#edf3f8" overflow={"auto"}>
          <Flex py={50} flexWrap={'wrap'} gap='' justifyContent={"center"} px={5} w="full">
            <Suspense fallback={<div>Carregando dados...</div>}>
              <CardEmpresas data={empresaFilter} />
            </Suspense>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}


export default Empresas;
