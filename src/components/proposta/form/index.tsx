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

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsTrash } from "react-icons/bs";
import { ListFornecedor } from "../../../components/data/fornecedor";
import { ListaEmpresa } from "@/components/Proposta/ListaEmpresa";
import { CompBusiness } from "@/components/Proposta/business";
import { CompPrazo } from "@/components/Proposta/prazo";
import { ProdutiList } from "@/components/Proposta/produt";
import { TableConteudo } from "@/components/Proposta/tabela";
import Loading from "@/components/elements/loading";

const PropostaForm = (props: { data?: any, Nprop?: any }) => {
  const { push, back } = useRouter()
  const { data: session } = useSession();
  const [MPedido, setNPedido] = useState('');
  const [Matriz, setMatriz] = useState('');
  const [Cliente, setCliente] = useState('');
  const [ClienteId, setClienteId] = useState('');
  const [Items, setItems] = useState<any>([]);
  const [Empresa, setEmpresa] = useState('');
  const [EmpresaCnpj, setEmpresaCnpj] = useState('');
  const [DataPedido, setDataPedido] = useState(new Date().toISOString());
  const [VencPedido, setVencPedido] = useState('');
  const [VencPrint, setVencPrint] = useState('');
  const [Condi, setCondi] = useState('');
  const [Prazo, setPrazo] = useState('');
  const [TotalGeral, setTotalGeral] = useState('');
  const [Deconto, setDeconto] = useState('');
  const [Frete, setFrete] = useState('');
  const [ValorFrete, setValorFrete] = useState('');
  const [Business, setBusiness] = useState(''); // id do negocio
  const [NNegocio, setNNegocio] = useState('')
  const [Obs, setObs] = useState('');
  const [Cliente_pedido, setCliente_pedido] = useState('');


  const toast = useToast();

  useEffect(() => {
    if (props.data) {
      const resp = props.data
      setNPedido()
      setMatriz()
      setCliente()
      setClienteId()
      setItems()
      setEmpresa()
      setEmpresaCnpj()
      setDataPedido()
      setDataPedido()
      setVencPedido()
      setVencPrint()
      setCondi()
      setDeconto()
      setPrazo()
      setTotalGeral()
      setFrete()
      setValorFrete()
      setBusiness()
      setNNegocio()
      setObs()
      setCliente_pedido()
    };
  }, [props.data]);

  const disbleProd =
    prazo === ""
      ? true
      : prazo === "A Prazo" && tipoprazo === ""
        ? true
        : false;

  const TotalGreal = () => {
    if (ListItens.length === 0) return "R$ 0,00";
    const totalItem = ListItens.reduce((acc: number, item: any) => {
      const valor: number = parseFloat(item.vFinal.replace(",", "."));
      const valorOriginal: number = parseFloat(item.vFinal.replace(",", "."));
      const qtd: number = item.Qtd;
      const mont: boolean = item.mont;
      const expo: boolean = item.expo;
      const acrec: number =
        mont && expo ? 1.2 : expo && !mont ? 1.1 : !expo && mont ? 1.1 : 0;
      const somaAcrescimo: number =
        acrec === 0 ? 0 : (valorOriginal * acrec - valorOriginal) * qtd;
      const total: number = valor * qtd + somaAcrescimo;
      return acc + total;
    }, 0);

    return totalItem.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  const DescontoGeral = () => {
    if (ListItens.length === 0) return "R$ 0,00";
    const descontos = ListItens.map((i: any) => i.desconto * i.Qtd);
    const total = descontos.reduce(
      (acc: number, valorAtual: number) => acc + valorAtual
    );
    return total.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  useEffect(() => {
    setTotalGeral(TotalGreal());
    setDesconto(DescontoGeral());
  }, [DescontoGeral, ListItens, TotalGreal]);

  useEffect(() => {
    console.log(prazo);
    if (prazo === "Antecipado") {
      setItens(
        ListItens.map((f: any) => {
          const valor = Number(f.vFinal.replace(".", "").replace(",", "."));
          const ValorGeral =
            Math.round(parseFloat(valor.toFixed(2)) * 100) / 100;
          const descont = ValorGeral * 0.05;
          const somaDescontMin =
            Math.round(parseFloat(descont.toFixed(2)) * 100) / 100;
          const TotalDesc = ValorGeral - somaDescontMin;
          f.total = Math.round(parseFloat(TotalDesc.toFixed(2)) * 100) / 100;
          f.desconto =
            Math.round(parseFloat(somaDescontMin.toFixed(2)) * 100) / 100;
          const data = { ...f };
          return data;
        })
      );
    } else {
      setItens(
        ListItens.map((f: any) => {
          const valor = Number(f.vFinal.replace(".", "").replace(",", "."));
          const ValorGeral =
            Math.round(parseFloat(valor.toFixed(2)) * 100) / 100;
          f.total = Math.round(parseFloat(ValorGeral.toFixed(2)) * 100) / 100;
          f.desconto = 0;
          const data = { ...f };
          return data;
        })
      );
    }
  }, [prazo]);

  const SalvarProdutos = async () => {
    setLoadingGeral(true)
    if (!saveNegocio || saveNegocio === "") {
      toast({
        title: "Esta Faltando informação",
        description:
          "Você deve vincular essa proposta a um n° Business ou negocio",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const Date5 = new Date(date);
      Date5.setDate(Date5.getDate() + 5);
      const VencDate = `${Date5.getUTCFullYear()}-${Date5.getUTCMonth() + 1 < 10
        ? "0" + (Date5.getUTCMonth() + 1)
        : Date5.getUTCMonth() + 1
        }-${Date5.getUTCDate() < 10 ? "0" + Date5.getUTCDate() : Date5.getUTCDate()
        }`;
      const VencDatePrint = `${Date5.getUTCDate() < 10 ? "0" + Date5.getUTCDate() : Date5.getUTCDate()
        }/${Date5.getUTCMonth() + 1 < 10
          ? "0" + (Date5.getUTCMonth() + 1)
          : Date5.getUTCMonth() + 1
        }/${Date5.getUTCFullYear()}`;

      const id: any = localStorage.getItem("id");

      const ProdutosItems = await ListItens.map((i: any) => {
        const valor2Original = i.vFinal.replace(".", "");
        const ValorProd = Number(valor2Original.replace(",", "."));
        const ValorOriginal =
          Math.round(parseFloat(ValorProd.toFixed(2)) * 100) / 100;
        const acrec =
          i.mont === true && i.expo === true
            ? 1.2
            : i.expo === true && i.mont === false
              ? 1.1
              : i.expo === false && i.mont === true
                ? 1.1
                : 0;
        const descont = tipoprazo === "Antecipado" ? ValorOriginal * 0.05 : 0;
        const somaAcrescimo =
          acrec === 0 ? ValorOriginal * i.Qtd : ValorOriginal * acrec * i.Qtd;
        const somaDescont = descont * i.Qtd;
        const somaDescontMin =
          Math.round(parseFloat(somaDescont.toFixed(2)) * 100) / 100;
        const TotalItem = somaAcrescimo - somaDescontMin;
        const result = Math.round(parseFloat(TotalItem.toFixed(2)) * 100) / 100;

        return {
          ...i,
          total: result,
        };
      });

      const data: any = {
        nPedido: MPedido,
        matriz: Loja,
        cliente: cnpj,
        clienteId: RelatEnpresaId,
        itens: ProdutosItems,
        empresa: Loja,
        dataPedido: date,
        vencPedido: VencDate,
        vencPrint: VencDatePrint,
        condi: prazo,
        prazo: tipoprazo,
        totalGeral: totalGeral,
        deconto: !Desconto
          ? "R$ 0,00"
          : Desconto === undefined
            ? "R$ 0,00"
            : Desconto === ""
              ? "R$ 0,00"
              : Desconto,
        vendedor: session?.user.name,
        vendedorId: session?.user.id,
        frete: frete,
        valorFrete: freteCif,
        business: id,
        obs: obs,
        cliente_pedido: clientePedido
      };
      const url = `/api/db/proposta/put/${Id}`;
      await axios({
        method: "PUT",
        url: url,
        data: data,
      })
        .then(async (res: any) => {
          toast({
            title: "Proposta Atualizada",
            description: res.data.message,
            status: "success",
            duration: 1000,
            isClosable: true,
          });

          const date = new Date();
          const DateAtua = date.toISOString();

          const msg = {
            date: DateAtua,
            user: "Sistema",
            msg: `Proposta atualizada, valor total agora é ${totalGeral}, pasando a ter ${parseInt(ListItens.length) + 1
              } items`,
          };

          const record = [...hirtori, msg];

          const data = {
            data: {
              incidentRecord: record,
            },
          };

          await axios({
            method: "PUT",
            url: "/api/db/business/put/id/" + BId,
            data: data,
          });

          router.back();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function handleInputChange(event: any) {
    const valor = event.target.value;
    setFreteCif(parseFloat(valor));
  }

  function getPrazo(prazo: SetStateAction<string>) {
    setTipoPrazo(prazo);
  }

  function getCnpj(CNPJ: SetStateAction<string>) {
    setCnpj(CNPJ);
  }
  function getIten(resposta: SetStateAction<any>) {
    const lista = ListItens;
    const maxSum =
      ListItens.length > 0
        ? Math.max(...ListItens.map((obj: any) => parseInt(obj.id) + 1))
        : 1;
    resposta.id = maxSum;
    const valor1 = Number(resposta.vFinal.replace(".", "").replace(",", "."));
    const ValorGeral = valor1;
    const valor = Math.round(parseFloat(valor1.toFixed(2)) * 100) / 100;
    resposta.total = Math.round(parseFloat(ValorGeral.toFixed(2)) * 100) / 100;
    resposta.expo = false;
    resposta.mont = false;
    resposta.codg = resposta.prodId;
    resposta.Qtd = 1;
    const desconto = prazo === "Antecipado" ? valor * 0.05 : 0;
    const somaDescontMin =
      Math.round(parseFloat(desconto.toFixed(2)) * 100) / 100;
    const TotalDesc = valor - somaDescontMin;
    const retorno = {
      ...resposta,
      desconto: Math.round(parseFloat(somaDescontMin.toFixed(2)) * 100) / 100,
      total: Math.round(parseFloat(TotalDesc.toFixed(2)) * 100) / 100,
    };
    const newItens = lista.map((f: any) => ({
      ...f,
      expo: !f.expo ? false : f.expo > false ? f.expo : false,
      mont: !f.mont ? false : f.mont > false ? f.mont : false,
      Qtd: !f.Qtd ? 1 : f.Qtd > 1 ? f.Qtd : 1,
    }));
    const ListaRetorno: any = [...newItens, retorno];
    setItens(ListaRetorno);
  }

  function getLoading(load: SetStateAction<boolean>) {
    setLoadingTable(load);
  }

  function getItemFinal(itemFinal: SetStateAction<any>) {
    const filterItens = ListItens.filter((i: any) => i.id !== itemFinal);
    setItens(filterItens);
  }

  if (loadingGeral) {
    return <Loading size="200px">Carregando...</Loading>;
  }


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
          <Box display="flex" gap={5} alignItems="center" mt={3} mx={5}>
            <Box>
              <ListaEmpresa onChangeValue={EmpresaCnpj} />
            </Box>
            <Box>
              <CompBusiness Resp={NNegocio} />
            </Box>
            <Box>
              <FormLabel
                htmlFor="cidade"
                fontSize="xs"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: "gray.50",
                }}
              >
                Data
              </FormLabel>
              <Input
                shadow="sm"
                type={"date"}
                size="sm"
                w="full"
                fontSize="xs"
                rounded="md"
                onChange={(e) => setDataPedido(e.target.value)}
                value={DataPedido}
              />
            </Box>
            <Box>
              <FormLabel
                htmlFor="cidade"
                fontSize="xs"
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
                fontSize="xs"
                rounded="md"
                placeholder="Selecione um Fornecedor"
                onChange={(e) => setLoja(e.target.value)}
                value={Loja}
              >
                {ListFornecedor.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  );
                })}
              </Select>
            </Box>
            <Box>
              <FormLabel
                htmlFor="cidade"
                fontSize="xs"
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
                fontSize="xs"
                rounded="md"
                placeholder="Tipos de pagamentos"
                onChange={(e) => setPrazo(e.target.value)}
                value={prazo}
              >
                <option value="Antecipado">Antecipado</option>
                <option value="À vista">Avista</option>
                <option value="A Prazo">A prazo</option>
              </Select>
            </Box>
            <Box hidden={prazo === "A Prazo" ? false : true}>
              <CompPrazo Resp={tipoprazo} onAddResp={getPrazo} />
            </Box>
            <Box>
              <FormLabel
                htmlFor="cidade"
                fontSize="xs"
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
                fontSize="xs"
                rounded="md"
                placeholder="Selecione um tipo de Frete"
                onChange={(e) => setFrete(e.target.value)}
              >
                <option value="CIF">CIF</option>
                <option value="FOB">FOB</option>
              </Select>
            </Box>
            <Box hidden={frete === "CIF" ? false : true}>
              <FormLabel
                htmlFor="cidade"
                fontSize="xs"
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
                fontSize="xs"
                rounded="md"
                onChange={handleInputChange}
                value={freteCif}
              />
            </Box>
          </Box>
          <Box mt={7}>
            <Heading size="sm">Itens da proposta comercial</Heading>
          </Box>
          <Box display="flex" gap={5} alignItems="center" mt={3} mx={5}>
            <Box w={"320px"} alignItems="center">
              <ProdutiList
                onCnpj={cnpj}
                onResp={getIten}
                ontime={disbleProd}
                retunLoading={getLoading}
                idProd={ListItens.length}
              />
            </Box>
            <Box alignItems="center">
              <FormLabel
                htmlFor="cidade"
                fontSize="xs"
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
                size="sm"
                w="full"
                fontSize="xs"
                rounded="md"
                onChange={(e) => setClientePedido(e.target.value)}
                value={clientePedido}
              />
            </Box>
            <Box w={"40rem"}>
              <Box display="flex" gap={5} alignItems="center">
                <Box w="full">
                  <FormLabel
                    htmlFor="cidade"
                    fontSize="xs"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Observação
                  </FormLabel>
                  <Textarea
                    w="full"
                    onChange={(e) => setObs(e.target.value)}
                    placeholder="Breve descrição sobre o andamento"
                    size="sm"
                    value={obs}
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
                  <TableConteudo
                    Itens={ListItens}
                    Prazo={prazo}
                    loading={loadingTable}
                    returnItem={getItemFinal}
                  />
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} me={10} mb={5}>
          <Flex gap={20}>
            <chakra.p>
              Total de itens: {ListItens.length === 0 ? "" : ListItens.length}
            </chakra.p>
            <chakra.p>
              Frete:{" "}
              {freteCif.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </chakra.p>
            <chakra.p>Desconto: {Desconto}</chakra.p>
            <chakra.p>Valor Total: {totalGeral}</chakra.p>
          </Flex>
          <Button colorScheme={"whatsapp"} onClick={SalvarProdutos}>
            Salvar Proposta
          </Button>
        </Box>
      </Flex>
    </>
  );
}
