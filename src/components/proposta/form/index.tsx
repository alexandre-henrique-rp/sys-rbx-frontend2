'use client'

import { ListFornecedor } from "@/components/data/ListFornecedor";
import {
  Box,
  Button,
  chakra,
  Checkbox,
  Flex,
  FormLabel,
  Heading,
  Icon,
  Input,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { mask, unMask } from 'remask';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { memo, SetStateAction, useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsTrash } from "react-icons/bs";
import ListaEmpresa from "./ListaEmpresa";
import { CompBusiness } from "./Compbusiness";
import { CompPrazo } from "./CompPrazo";
import ProdutiList from "./ProdutiList";



const PropostaFormulario = (props: { data?: any }) => {
  const { push, back } = useRouter()
  const { data: session } = useSession();
  const [MPedido, setNPedido] = useState('');
  const [Fornecedor, setFornecedor] = useState('');
  const [FornecedorId, setFornecedorId] = useState('');
  const [Cliente, setCliente] = useState('');
  const [ClienteNome, setClienteNome] = useState('');
  const [ClienteId, setClienteId] = useState('');
  const [Items, setItems] = useState([]);
  const [DataPedido, setDataPedido] = useState(new Date().toISOString());
  const [VencPedido, setVencPedido] = useState('');
  const [VencPrint, setVencPrint] = useState('');
  const [Condi, setCondi] = useState('');
  const [Prazo, setPrazo] = useState('');
  const [TotalGeral, setTotalGeral] = useState('');
  const [Deconto, setDeconto] = useState('');
  const [Frete, setFrete] = useState('');
  const [ValorFrete, setValorFrete] = useState('');
  const [ValorFreteVis, setValorFreteVis] = useState('R$ 0,00');
  const [Business, setBusiness] = useState(''); // id do negocio
  const [NNegocio, setNNegocio] = useState('')
  const [Obs, setObs] = useState('');
  const [Cliente_pedido, setCliente_pedido] = useState('');
  const [dados, setDados] = useState([])


  useEffect(() => {
    if (props.data) {
      const [resp] = props.data
      console.log("🚀 ~ file: index.tsx:65 ~ useEffect ~ resp:", resp)

      setNPedido(resp.attributes.nPedido)
      setFornecedor(resp.attributes.fornecedorId.data.attributes.CNPJ)
      setFornecedorId(resp.attributes.fornecedorId.data.id)
      setCliente(resp.attributes.empresa.data.attributes.CNPJ)
      setClienteNome(resp.attributes.empresa.data.attributes.nome)
      setClienteId(resp.attributes.empresa.data.id)
      setItems(resp.attributes.itens)
      setDataPedido(resp.attributes.dataPedido)
      setCondi(resp.attributes.condi)
      setFrete(resp.attributes.frete)
      setDeconto(resp.attributes.desconto)
      setPrazo(resp.attributes.prazo)
      setTotalGeral(resp.attributes.totalGeral)
      setValorFrete(resp.attributes.valorFrete)
      const ValFrete = resp.attributes.valorFrete === '' || resp.attributes.valorFrete === '0' ? 'R$ 0,00' : mask(resp.attributes.valorFrete, ['R$ ,99', 'R$ 9,99', 'R$ 99,99', 'R$ 999,99', 'R$ 9999,99', 'R$ 99999,99'])
      setValorFreteVis(ValFrete) //mascara frete
      setBusiness(resp.attributes.business.data.id)
      setNNegocio(resp.attributes.business.data.attributes.nBusiness)
      setObs(resp.attributes.obs)
      setCliente_pedido(resp.attributes.cliente_pedido)
    }
  }, [props.data]);


  function handleInputChange(e: any) {
    const valor = e.target.value;
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ['R$ ,99', 'R$ 9,99', 'R$ 99,99', 'R$ 999,99', 'R$ 9999,99', 'R$ 99999,99']);
    setValorFreteVis(valorLinpo === "" ? 'R$ 0,00' : masked);
    setValorFrete(valorLinpo);
  }

  function getPrazo(prazo: SetStateAction<string>) {
    setPrazo(prazo);
  }

  // {
  //   "data": {
  //     "itens": "string",
  //     "vencPedido": "2023-05-24",
  //     "empresa": ClienteId,
  //     "empresaId": ClienteId,
  //     "vendedorId": 0,
  //     "nPedido": MPedido,
  //     "desconto": Deconto,
  //     "CNPJClinet": Cliente,
  //     "andamento": "string",
  //     "valorFrete": "string",
  //     "vencPrint": "string",
  //     "business": "string or id",
  //     "dataPedido": DataPedido,
  //     "obs": "string",
  //     "condi": Condi,
  //     "prazo": "string",
  //     "frete": Frete,
  //     "vendedor": "string",
  //     "totalGeral": TotalGeral,
  //     "user": "string or id",
  //     "fornecedor": Fornecedor,
  //     "businessId": "string",
  //     "stausPedido": true,
  //     "Bpedido": "string",
  //     "fornecedorId": FornecedorId,
  //     "cliente_pedido": "string"
  //   }
  // }

  return (
    <>
      <Flex h="100vh" px={10} w="100%" flexDir={"column"} mt="5" justifyContent={'space-between'} >
        <Box>
          <Flex gap={3}>
            <BsArrowLeftCircleFill
              color="blue"
              cursor={'pointer'}
              size={30}
              onClick={() => back()}
            />
            <Heading size="md">Proposta comercial</Heading>
          </Flex>
          <Box display="flex" gap={5} alignItems="center" flexWrap={'wrap'} mt={3} mx={5}>
            <Box>
              <ListaEmpresa onChangeValue={ClienteNome} />
            </Box>
            <Box>
              <CompBusiness Resp={NNegocio} />
            </Box>
            <Box>
              <FormLabel
                htmlFor="cidade"
                fontSize="10px"
                fontWeight="md"
                color="gray.700"
              >
                Data
              </FormLabel>
              <Input
                shadow="sm"
                type={"date"}
                size="xs"
                w="full"
                fontSize="10px"
                rounded="md"
                onChange={(e) => setDataPedido(e.target.value)}
                value={DataPedido}
              />
            </Box>
            <Box>
              <FormLabel
                htmlFor="cidade"
                fontSize="10px"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: "gray.50",
                }}
              >
                Fornecedor
              </FormLabel>
              <Select
                shadow="sm"
                size="xs"
                w="full"
                fontSize="10px"
                rounded="md"
                placeholder="Selecione um Fornecedor"
                onChange={(e) => setFornecedor(e.target.value)}
                value={Fornecedor}
              >
                {ListFornecedor.map((item) => {
                  return (
                    <option key={item.id} value={item.cnpj}>
                      {item.title}
                    </option>
                  );
                })}
              </Select>
            </Box>
            <Box>
              <FormLabel
                htmlFor="cidade"
                fontSize="10px"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: "gray.50",
                }}
              >
                Condição de pagamento
              </FormLabel>
              <Select
                shadow="sm"
                size="xs"
                w="full"
                fontSize="10px"
                rounded="md"
                placeholder="Tipos de pagamentos"
                onChange={(e) => setCondi(e.target.value)}
                value={Condi}
              >
                <option value="Antecipado">Antecipado</option>
                <option value="À vista">Avista</option>
                <option value="A Prazo">A prazo</option>
              </Select>
            </Box>
            <Box hidden={Condi === "A Prazo" ? false : true}>
              <CompPrazo Resp={Prazo} onAddResp={getPrazo} oncnpj={Cliente} />
            </Box>
            <Box>
              <FormLabel
                htmlFor="cidade"
                fontSize="10px"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: "gray.50",
                }}
              >
                Frete
              </FormLabel>
              <Select
                shadow="sm"
                size="xs"
                w="full"
                fontSize="10px"
                rounded="md"
                placeholder="Selecione um tipo de Frete"
                onChange={(e) => setFrete(e.target.value)}
                value={Frete}
              >
                <option value="CIF">CIF</option>
                <option value="FOB">FOB</option>
              </Select>
            </Box>
            <Box hidden={Frete === "CIF" ? false : true}>
              <FormLabel
                htmlFor="cidade"
                fontSize="10px"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: "gray.50",
                }}
              >
                Valor de Frete
              </FormLabel>
              <Input
                textAlign={"end"}
                size="xs"
                w={"7rem"}
                fontSize="10px"
                rounded="md"
                onChange={handleInputChange}
                value={ValorFreteVis}
              />
            </Box>
          </Box>
          <Box mt={7}>
            <Heading size="sm">Itens da proposta comercial</Heading>
          </Box>
          <Box display="flex" gap={5} alignItems="center" mt={3} mx={5}>
            <Box w={"320px"} alignItems="center">
              <ProdutiList onCnpj={Cliente} />
            </Box>
            <Box alignItems="center">
              <FormLabel
                fontSize="10px"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: "gray.50",
                }}
              >
                Pedido do Clienet N°:
              </FormLabel>
              <Input
                shadow="sm"
                type={"text"}
                size="xs"
                w="full"
                fontSize="10px"
                rounded="md"
                onChange={(e) => setCliente_pedido(e.target.value)}
                value={Cliente_pedido}
              />
            </Box>
            <Box w={"40rem"}>
              <Box display="flex" gap={5} alignItems="center">
                <Box w="full">
                  <FormLabel
                    htmlFor="cidade"
                    fontSize="10px"
                    fontWeight="md"
                    color="gray.700"
                  >
                    Observação
                  </FormLabel>
                  <Textarea
                    w="full"
                    fontSize="10px"
                    rounded="md"

                    onChange={(e) => setObs(e.target.value)}
                    placeholder="Breve descrição sobre o andamento"

                    size="xs"
                    value={Obs}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box mt={8} w={"100%"} mb={5}>
            <Box>
              <TableContainer>
                <Table variant="striped" colorScheme="green">
                  <Thead>
                    <Tr>
                      <Th px='0' w={"1.3rem"}></Th>
                      <Th px='0' w={"8rem"} textAlign={"center"} fontSize={'0.7rem'}>Item</Th>
                      <Th px='0' w={"5rem"} textAlign={"center"} fontSize={'0.7rem'}>
                        Código
                      </Th>
                      <Th px='0' w={"3rem"} textAlign={"center"} fontSize={'0.7rem'}>
                        Qtd
                      </Th>
                      <Th px='0' w={"5rem"} textAlign={"center"} fontSize={'0.7rem'}>
                        altura
                      </Th>
                      <Th px='0' w={"5rem"} textAlign={"center"} fontSize={'0.7rem'}>
                        largura
                      </Th>
                      <Th px='0' w={"5rem"} textAlign={"center"} fontSize={'0.7rem'}>
                        comprimento
                      </Th>
                      <Th px='0' w={"3rem"} textAlign={"center"} fontSize={'0.7rem'}>
                        Mont.
                      </Th>
                      <Th px='0' w={"3rem"} textAlign={"center"} fontSize={'0.7rem'}>
                        Expo.
                      </Th>
                      <Th px='0' w={"6rem"} textAlign={"center"} fontSize={'0.7rem'}>
                        Preço un
                      </Th>
                      <Th px='0' w={"6rem"} textAlign={"center"} fontSize={'0.7rem'}>
                        Preço total
                      </Th>
                      <Th px='0' textAlign={"center"} w={"5rem"}>
                        <Icon as={BsTrash} boxSize={4} color={"whatsapp.600"} />
                      </Th>
                    </Tr>
                  </Thead>
                  {/* <TableConteudo
                    Itens={setItems}
                    Prazo={Prazo}
                    loading={loadingTable}
                    returnItem={getItemFinal}
                  /> */}
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} me={10} mb={5}>
          <Flex gap={20}>
            <chakra.p>
              Total de itens: {setItems.length === 0 ? "" : setItems.length}
            </chakra.p>
            <chakra.p>
              Frete:{" "}
              {ValorFrete === "" || ValorFrete === "0" ? 'R$ 0,00' : ValorFreteVis}
            </chakra.p>
            <chakra.p>Desconto: {TotalGeral ? TotalGeral : 'R$ 0,00'}</chakra.p>
            <chakra.p>Valor Total: {Deconto ? Deconto : 'R$ 0,00'}</chakra.p>
          </Flex>
          <Button colorScheme={"whatsapp"}>
            Salvar Proposta
          </Button>
        </Box>
      </Flex>
    </>
  );
}


export default memo(PropostaFormulario);
// export default PropostaFormulario;