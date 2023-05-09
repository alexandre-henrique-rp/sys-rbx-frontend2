'use client'
import { CardEmpresas } from '@/components/empresas/busca/card';
import { Box, Button, Flex, FormLabel, Input } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [pesquisa, sePesquisa] = useState('')
  const { push } = useRouter()


  const handleSearch = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL + `/empresas?filters[status][$eq]=true&fields[0]=nome&fields[1]=CNPJ&fields[2]=celular&fields[3]=fone&fields[4]=celular&populate[responsavel][fields][0]=nome`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
      },
      //  cache: 'no-store'
       // a padrão é a cache:'force-cache' essa função faz qcom que a requisição seja unica pelo servidor deixando a pagina estatica
  //   // para deixar dinamica vamos usar o cache: 'no-store' 
    });
    const data = await response.json();
    setEmpresas(data.data);
  };
  handleSearch()

  const LowerBusca = pesquisa.toLowerCase()

  const empresaFilter: any = empresas.filter((E: any) => {
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
            <Suspense fallback={<p>Carregando dados...</p>}>
              <CardEmpresas data={empresaFilter} />
            </Suspense>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}