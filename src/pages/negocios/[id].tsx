import Loading from "@/component/elements/loading";
import { NegocioHeader } from "@/component/negocios/fragment/negocioHeader";
import { Box, Flex, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";


export default function CreateNegocio() {
  const router = useRouter();
  const id: any = router.query.id;
  const toast = useToast();
  const divRef = useRef<HTMLDivElement>(null);
  const [msg, setMsg] = useState([]);
  const [loadingGeral, setLoadingGeral] = useState(true);
  const [loading, setLoading] = useState(false);
  const [nBusiness, setnBusiness] = useState("");
  const [Approach, setApproach] = useState("");
  const [Budget, setBudget] = useState("");
  const [Status, setStatus] = useState("");
  const [Deadline, setDeadline] = useState("");
  const [DataRetorno, setDataRetorno] = useState("");
  const [Historia, setHistoria] = useState([]);
  const [ChatHistory, setChatHistory] = useState([]);
  const [Etapa, setEtapa] = useState<any | null>();
  const [Mperca, setMperca] = useState<any | null>();

  useEffect(() => {
    const div = divRef.current;
    if (div) {
      setTimeout(() => {
        div.scrollTop = div.scrollHeight;
      }, 0);
    }
  }, [divRef, msg]);

  // recuperar infos do cliente
  useEffect(() => {
    (async () => {
      localStorage.setItem('id', id)
      const url = "/api/negocios/get/id/" + id;
      console.log(url);
      await axios({
        method: "GET",
        url: url,
      })
        .then((res) => {
          setnBusiness(res.data.attributes.nBusiness);
          setApproach(res.data.attributes.Approach);
          setBudget(res.data.attributes.Budget);
          setStatus(res.data.attributes.andamento);
          setDeadline(res.data.attributes.deadline);
          setDataRetorno(res.data.attributes.DataRetorno);
          setHistoria(res.data.attributes.history);
          setChatHistory(res.data.attributes.incidentRecord);
          setEtapa(res.data.attributes.etapa);
          setMperca(res.data.attributes.Mperca);
          // fim do loading
          setLoadingGeral(false);
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Ops",
            description: "erro ao recuperar as informações",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          // fim do loading
          setLoadingGeral(false);
        });
    })();
  }, [id, toast]);

  useEffect(() => {
    if (msg) {
      (async () => {
        setLoading(true);
        const url = "/api/negocios/get/id/" + id;
        console.log(url);
        //cunsulta informações gerais do cliente
        await axios({
          method: "GET",
          url: url,
        })
          .then((res) => {
            // console.log(res.data.attributes);
            setChatHistory(res.data.attributes.incidentRecord);
            // fim do loading
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            toast({
              title: "Ops",
              description: "erro ao recuperar as informações",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            // fim do loading
            setLoading(false);
          });
      })();
    }
  }, [id, msg, toast]);

  function getMsg(menssage: React.SetStateAction<any>) {
    setMsg(menssage);
  }
  function getLoad(lading: React.SetStateAction<any>) {
    setLoadingGeral(lading);
  }

  if (loadingGeral) {
    return <Loading size="200px">Carregando...</Loading>;
  }

  return (
    <>
      <Flex w="100%" h="100vh" flexDirection={'column'} justifyContent={'space-between'}>
<Box>

</Box>
        <Box bg={"gray.200"} w="full" p={5}>
          <NegocioHeader
            nBusiness={nBusiness}
            Approach={Approach}
            Budget={Budget}
            Status={Status}
            Deadline={Deadline}
            historia={Historia}
            DataRetorno={DataRetorno}
            Mperca={Mperca}
            etapa={Etapa}
            onLoad={getLoad}
          />
        </Box>
        <Box bg="#edeae6" w="full" h={'full'} ref={divRef} overflowY={"auto"}>
          <BodyChat conteudo={ChatHistory} loading={loading} />
        </Box>
        <Box w="full">
          <NegocioFooter data={ChatHistory} onGetValue={getMsg} />
        </Box>
      </Flex>
    </>
  );
}
