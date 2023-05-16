import { StatusAndamento } from "@/components/data/statusAndamento";
import { Box, Flex, chakra } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GetCard = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL +
    "/businesses?populate=*&filters[status][$eq]=true&sort[0]=id%3Adesc", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
    },
    next: {
      revalidate: 30 // aki eu esto dizendo que esse requisiçao tem que validar as informaçoes acada 30mim
    }
  })
  const data = await response.json();
  const resposta = data.data
  return resposta
}


export const BodyCard = (props:{loading: any, onload: any}) => {
  const [dados, setDados] = useState<any | null>([]);
  const { push } = useRouter()

  useEffect(()=>{
    (async() =>{
      const cardNegocios = await GetCard()
      setDados(cardNegocios)
      props.onload(false)
    })()
  }, [props, props.loading])
  

  return (
    <>
      {dados.map((i: any) => {

        const [Andmento] = StatusAndamento.filter((s: any) => s.id == i?.attributes.andamento).map((i: any) => i.title)

        return (
          <>
            <Box
              mx="auto"
              px={4}
              py={5}
              mb={5}
              rounded="lg"
              shadow="lg"
              boxShadow="dark-lg"
              bg="white"
              w={'20rem'}
              key={i.id}
              fontSize="0.5rem"
              cursor={'pointer'}
              onClick={() => push('/negocios/' + i.id)}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <chakra.span
                  fontSize="lg"
                  fontWeight={'bold'}
                >
                  {i.attributes.empresa.data?.attributes.nome}
                </chakra.span>

              </Flex>

              <Box mt={2}>
                <Box
                  display={'flex'}
                  flexDirection={['column', 'column', 'row', 'row']}
                >
                </Box>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  gap={5}
                  flexWrap={'wrap'}
                  lineHeight={'0.5rem'}
                >
                  <Flex>
                    <chakra.p
                      color="gray.600"
                      fontSize="0.8rem"
                    >
                      Estimativa:
                    </chakra.p>
                    <chakra.p
                      color="gray.600"
                      ms={2}
                      fontSize="0.8rem"
                    >
                      {i.attributes.Budget}
                    </chakra.p>
                  </Flex>
                  <Flex>
                    <chakra.p
                      color="gray.600"
                      fontSize="0.8rem"
                    >
                      Data de Entrega:
                    </chakra.p>
                    <chakra.p
                      color="gray.600"
                      ms={2}
                      fontSize="0.8rem"
                    >
                      {new Date(i?.attributes.deadline).toLocaleDateString()}
                    </chakra.p>
                  </Flex>
                  <Flex alignItems="center">
                    <chakra.p
                      color="gray.600"
                      fontSize="0.8rem"
                    >
                      Pedido:
                    </chakra.p>
                    <chakra.p
                      color="gray.600"
                      ms={2}
                      fontWeight={'semibold'}
                    >
                      {i?.attributes.nBusiness}
                    </chakra.p>
                  </Flex>
                  <Flex alignItems="center">
                    <chakra.p
                      color="gray.600"
                      fontSize="0.8rem"
                    >
                      Andamento:
                    </chakra.p>
                    <chakra.p
                      color="gray.600"
                      ms={2}
                      fontWeight={'semibold'}
                    >
                      {Andmento}
                    </chakra.p>
                  </Flex>
                  <Flex alignItems="center">
                    <chakra.p
                      color="gray.600"
                      fontSize="0.8rem"
                    >
                      Qtd proposta:
                    </chakra.p>
                    <chakra.p
                      color="gray.600"
                      ms={2}
                      fontSize="0.8rem"
                    >
                      {i?.attributes.pedidos.data.length}
                    </chakra.p>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </>
        )
      })}
    </>
  );
};