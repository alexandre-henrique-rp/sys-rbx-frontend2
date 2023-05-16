import { StatusPerca } from "@/components/data/statusPerca";
import { BtmBack } from "@/components/geral/BTMBack";
import { BtnStatus } from "@/components/geral/btnStatus";
import { SelecAtendimento } from "@/components/geral/selectAtendimento";
import { SelecNegocio } from "@/components/geral/selectNegocio";
import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import { ExcluirNegocio } from "./excluir";


export const NegocioHeader = (props: {
  nBusiness: string;
  Approach: string;
  Budget: string;
  Status: any;
  Deadline: string;
  historia?: any;
  DataRetorno?: string;
  etapa?: any;
  Mperca?: any;
  id: any;
}) => {
  
  const router = useRouter();
  const ID = props.id;
  const toast = useToast();
  const { data: session } = useSession();
  const [Status, setStatus] = useState<any | null>();
  const [Etapa, setEtapa] = useState<any | null>();
  const [Mperca, setMperca] = useState<any | null>();
  const [Busines, setBusines] = useState("");
  const [Approach, setApproach] = useState("");
  const [Budget, setBudget] = useState("");
  const [Deadline, setDeadline] = useState("");
  const [DataRetorno, setDataRetorno] = useState<any>("");


  useEffect(() => {
    setStatus(props.Status);
    setBudget(props.Budget);
    setDeadline(props.Deadline);
    setBusines(props.nBusiness);
    setApproach(props.Approach);
    setDataRetorno(props.DataRetorno);
    setMperca(props.Mperca)
    setEtapa(props.etapa)
  }, [props.Approach, props.Budget, props.DataRetorno, props.Deadline, props.Mperca, props.Status, props.etapa, props.nBusiness]);

  const historicomsg = {
    vendedor: session?.user.name,
    date: new Date().toLocaleString(),
    msg: `Vendedor(a) ${session?.user.name}, alterou as informações desse Busines`,
  };

  const history = [...props.historia, historicomsg];

  const Salve = async () => {
    const data = {
      data: {
        deadline: Deadline,
        nBusiness: Busines,
        Budget: Budget,
        Approach: Approach,
        history: history,
        etapa: Etapa,
        andamento: Status,
        Mperca: Mperca,
        DataRetorno: Status !== 4 ? null : DataRetorno,
      },
    };

    await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL + '/businesses/' + ID,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
      },
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then(()=>{
      toast({
        title: "Atualização feita",
        description: "Atualização das informações foi efetuada com sucesso",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    })
    .catch((err) => console.error(err));
  };

  function getStatus(statusinf: SetStateAction<any>) {
    setStatus(statusinf);
  }
  function getAtendimento(atendimento: SetStateAction<string>) {
    setApproach(atendimento);
  }
  function getEtapa(etapaNegocio: SetStateAction<string>) {
    setEtapa(etapaNegocio);
  }


  return (
    <>
      <Flex>
        <Flex gap={8} w={"85%"} flexWrap={"wrap"}>
          <Flex alignItems={"center"}>
          <BtmBack Url={'/negocios'} />
          </Flex>
          <Box>
            <FormLabel
              htmlFor="cidade"
              fontSize="xs"
              fontWeight="md"
              color="gray.700"
            >
              N° Negócio
            </FormLabel>
            <Input
              shadow="sm"
              fontSize="xs"
              rounded="md"
              border={'1px solid #6666'}
              onChange={(e) => setBusines(e.target.value)}
              value={props.nBusiness}
            />
          </Box>
          <Box>
            <SelecAtendimento
              Resp={props.Approach}
              onAddResp={getAtendimento}
            />
          </Box>
          <Box>
            <FormLabel
              htmlFor="cidade"
              fontSize="xs"
              fontWeight="md"
              color="gray.700"
            >
              Orçamento estimado
            </FormLabel>
            <Input
              shadow="sm"
              size="sm"
              w="full"
              fontSize="xs"
              rounded="md"
              border={'1px solid #6666'}
              onChange={(e) => setBudget(e.target.value)}
              value={Budget.toLocaleString()}
            />
          </Box>
          <Box>
            <FormLabel
              htmlFor="cidade"
              fontSize="xs"
              fontWeight="md"
              color="gray.700"
            >
              Prazo de Entrega
            </FormLabel>
            <Input
              shadow="sm"
              size="sm"
              w="full"
              type={"date"}
              fontSize="xs"
              rounded="md"
              border={'1px solid #6666'}
              onChange={(e) => setDeadline(e.target.value)}
              value={Deadline}
            />
          </Box>
          <Box>
            <SelecNegocio Resp={Etapa} onAddResp={getEtapa}/>
          </Box>
          <Box>
            <BtnStatus Resp={props.Status} onAddResp={getStatus} />
          </Box>
          {Status !== "6" ? null : (
            <>
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
                  Motivo de Perda
                </FormLabel>
                <Select
                  shadow="sm"
                  size="sm"
                  w="full"
                  fontSize="xs"
                  rounded="md"
                  placeholder=" "
                  border={'1px solid #6666'}
                  onChange={(e) => setMperca(e.target.value)}
                  value={Mperca}
                >
                  {StatusPerca.map((i: any) => (
                    <option key={i.id} value={i.id}>
                      {i.title}
                    </option>
                  ))}
                </Select>
              </Box>
            </>
          )}
          {Status !== "4" ? null : (
            <>
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
                  Data de retorno
                </FormLabel>
                <Input
                  shadow="sm"
                  size="sm"
                  w="full"
                  type={"date"}
                  fontSize="xs"
                  rounded="md"
                  border={'1px solid #6666'}
                  onChange={(e) => setDataRetorno(e.target.value)}
                  value={DataRetorno}
                />
              </Box>
            </>
          )}
        </Flex>
        <Flex alignItems={"center"} flexWrap={'wrap'} gap={3} w={"20%"}>
          <Button colorScheme={"whatsapp"} onClick={Salve}>
            Salvar
          </Button>
          <Button
            colorScheme={"green"}
            onClick={() => router.push("/Propostas/" + ID)}
          >
            Propostas
          </Button>
          <Button
            colorScheme={"red"}
            onClick={async () => {
              await ExcluirNegocio(ID)
              toast({
                title: 'Negocio foi Deletado',
                status: 'info',
                duration: 3000,
                isClosable: true,
              });
              router.push("/Negocios");
            }}
          >
            Excluir
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
