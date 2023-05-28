import { Box, Flex, chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { StatusAndamento } from "../../data/status";


export const NegocioCard = (props: { data: any }) => {
  const dados = props.data
  const router = useRouter()
  return (
    <>
      <Box
        bg={"blackAlpha.300"}
        w={"100%"}
        h={"100%"}
        boxShadow={"dark-lg"}
        rounded={15}
        p={5}
      >
        <Box w={"100%"} h={"100%"} overflowX={"hidden"}>
          <Flex
            flexWrap={'wrap'}
          >
            {!dados
              ? null
              : dados.map((i: any) => {
                const id = i?.id
                const deadline = i?.attributes.deadline
                const nBusiness = i?.attributes.nBusiness
                const Budget = i?.attributes.Budget
                const pedidos= i?.attributes.pedidos.data.length
                const empresa = i?.attributes.empresa.data.attributes.nome
                const andamento= i?.attributes.andamento

                const [Andmento] = StatusAndamento.filter((s) => s.id == andamento?.toString()).map((i) => i.title)

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
                      w={'23rem'}
                      key={id}
                      fontSize="0.5rem"
                      cursor={'pointer'}
                      onClick={() => router.push('/negocios/' + id)}
                    >
                      <Flex justifyContent="space-between" alignItems="center">
                        <chakra.span
                          fontSize="lg"
                          fontWeight={'bold'}
                        >
                          {empresa}
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
                              {Budget}
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
                              {new Date(deadline).toLocaleDateString()}
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
                              {nBusiness}
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
                              {pedidos}
                            </chakra.p>
                          </Flex>
                        </Box>
                      </Box>
                    </Box>
                  </>
                );
              })}
          </Flex>
        </Box>
      </Box>
    </>
  );
};
