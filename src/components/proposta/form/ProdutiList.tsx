'use client'
import {
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState, memo, useMemo } from "react";
import { BiPlusCircle } from "react-icons/bi";

async function getProtudo(cnpj: string) {
  const Retorno = await fetch(`/propostas/api/produto/geral/${cnpj}`)
  const json = await Retorno.json()
  return json
}

const ProdutiList = (props: {
  onCnpj: any;
  onResp?: any;
  ontime?: boolean;
  onValue?: any;
}) => {
  const [Produtos, setProdutos] = useState<any>([]);
  const [itenId, setItenId] = useState("");

  useEffect(() => {
    (async () => {
        const Retorno = await fetch(`/propostas/api/produto/geral/${props.onCnpj}`)
        const json = await Retorno.json()
        setProdutos(json)
    })()
  }, [Produtos, props.onCnpj])


  const addItens = async () => {
    const request = await fetch(`/propostas/api/produto/${itenId}`)
    const reponse = await request.json()
    props.onResp(reponse);
  };
  console.log("🚀 ~ file: ProdutiList.tsx:20 ~ Produtos:", Produtos)

  return (
    <>
      <Box hidden={props.ontime}>
        <Flex
          gap={8}
          w={"320px"}
          alignItems="center"
        >
          <Box>
            <FormLabel
              fontSize="xs"
              fontWeight="md"
              color="gray.700"
            >
              Produtos
            </FormLabel>
            <Select
              shadow="sm"
              size="sm"
              w="full"
              fontSize="xs"
              rounded="md"
              placeholder="Selecione um Produto"
              onChange={(e) => setItenId(e.target.value)}
              value={itenId}
            >
              {/* {Produtos.map((item: any) => {

                return (
                  <>
                    <option value={item.prodId}>{item.nomeProd}</option>
                  </>
                );
              })} */}
            </Select>
          </Box>
          <Box>
            <Icon
              as={BiPlusCircle}
              boxSize={8}
              mt={8}
              color="whatsapp.600"
              cursor="pointer"
              onClick={addItens}
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default memo(ProdutiList)
