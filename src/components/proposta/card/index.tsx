import {
  Box,
  Button,
  chakra,
  Flex,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import { LoteDb } from "./requests/loteDb";
import { LoteRibermax } from "./requests/loteRibermax";
import { Trello } from "./requests/trello";
import { PedidoClientePost } from "./requests/postPedido";
import { useRouter } from "next/navigation";
import  BTMPdf  from "./BtmPdf";



export const CardList = (props: { id: string }) => {
  const {push} = useRouter();
  const toast = useToast();
  const [Data, setData] = useState([]);

  const GetPedidos =async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL +
      `/pedidos?populate=*&filters[businessId][$eq]=${props.id}`, {
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
    setData(resposta);
  }

  GetPedidos()


  const pedido = async (numero: string) => {
    toast({
      title: "Só um momento estou processando!",
      status: "warning",
      isClosable: true,
      position: 'top-right',
    });
  
    try {

      const requests = [
        LoteDb(numero),
        LoteRibermax(numero),
        Trello(numero),
        PedidoClientePost(numero),
      ];
  
      // Executa todas as requisições em paralelo
      const [res1, res2, res3] = await Promise.all(requests.slice(0, 3));
      const res4 = await requests[3];
  
      const [data1, data2, data3] = await Promise.all([
        res1.json(),
        res2.json(),
        res3.json()
      ]);
  
      console.log(data1);
      console.log(data2);
      console.log(data3);
  
      toast({
        title: "Pedido realizado com sucesso!",
        status: "success",
        duration: 5000,
        position: 'top-right',
      });
  
      setTimeout(() => push("/negocios/" + props.id), 1500);
    } catch (err) {
      console.log(err);
  
      toast({
        title: "Opss.",
        description: "Entre em contato com o suporte",
        status: "error",
        duration: 9000,
        position: 'top-right',
      });
    }
  };
  

  return (
    <>
      <SimpleGrid
        p="1rem"
        columns={{ base: 1, md: 3 }}
        row={{ base: 1, md: 5 }}
        spacing={{ base: 3, md: 36 }}
      >
        {!Data
          ? null
          : Data.map((i: any) => {
            const dat = new Date(i.attributes.dataPedido);
            const meses = [
              "Jan",
              "Fev",
              "Mar",
              "Abr",
              "Mai",
              "Jun",
              "Jul",
              "Ago",
              "Set",
              "Out",
              "Nov",
              "Dez",
            ];
            const DataPedido = `${dat.getDate() + 1} ${meses[dat.getMonth()]
              } ${dat.getFullYear()}`;

            return (
              <>
                <Box
                  mx="auto"
                  rounded="xl"
                  shadow="md"
                  bg="white"
                  w="sm"
                  px={5}
                  py={4}
                >
                  <Box>
                    <Flex w={"fill"} flexWrap={'wrap'} gap={3}>
                      <Text fontSize="0.8rem" fontWeight="bold" color="gray.700">
                        Proposta N°:{" "}
                        <chakra.span
                          fontSize="0.8rem"
                          fontWeight="light"
                          textTransform="uppercase"
                          color="brand.600"
                        >
                          {i.attributes.nPedido}
                        </chakra.span>
                      </Text>
                      <Text fontSize="0.8rem" fontWeight="bold" color="gray.700">
                        Negocio N°:{" "}
                        <chakra.span
                          fontSize="0.8rem"
                          fontWeight="light"
                          textTransform="uppercase"
                          color="brand.600"
                        >
                          {i.attributes.business.data.attributes.nBusiness}
                        </chakra.span>
                      </Text>
                      <Text
                        mx={2}
                        fontWeight="bold"
                        color="gray.700"
                        fontSize="0.8rem"
                      >
                        Pedido gerado em : {''}
                        <chakra.span
                          mx={1}
                          fontSize="0.8rem"
                          color="gray.600"
                          fontWeight="light"
                        >
                          {DataPedido}
                        </chakra.span>
                      </Text>
                    </Flex>
                    <Flex
                      mt={2}
                      justifyContent={"center"}
                      alignItems={"center"}
                      flexDir={"column"}
                    >
                      <Text
                        display="block"
                        color="gray.800"
                        fontWeight="bold"
                        fontSize="lg"
                        mt={2}
                        textAlign={"center"}
                      >
                        {!i.attributes.empresa
                          ? null
                          : i.attributes.empresa.data.attributes.nome}
                      </Text>
                    </Flex>

                    <Box mt={3}>
                      <Flex flexWrap={'wrap'} gap={3}>
                        <Button
                          fontSize={'0.8rem'}
                          p={3}
                          colorScheme={"blackAlpha"}
                          onClick={() =>
                            push(
                              "/Propostas/update/" + i.attributes.nPedido
                            )
                          }
                        >
                          Editar Proposta
                        </Button>
                        <BTMPdf nPedido={i.attributes.nPedido} empresa={i.attributes.empresa.data.attributes.nome} />
                        <Button
                          fontSize={'0.8rem'}
                          p={3}
                          colorScheme={"messenger"}
                          onClick={() => pedido(i.attributes.nPedido)}
                          isDisabled={i.attributes.business.data.attributes.andamento === 5 ? false : true}
                        >
                          Gerar Pedido
                        </Button>
                      </Flex>
                    </Box>
                  </Box>
                </Box>
              </>
            );
          })}
      </SimpleGrid>
    </>
  );
};
