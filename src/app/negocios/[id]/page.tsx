'use client'
import { BodyChat } from "@/components/negocio/bodyCliente";
import { NegocioFooter } from "@/components/negocio/footerCliente";
import { NegocioHeader } from "@/components/negocio/headCliente";
import { Box, Flex, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

interface UpDateProps {
  params: {
    id: "string",
  }
}

export default function NegocioID({ params }: UpDateProps) {
  const { id } = params;
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

  const getNegocio = async () => {
    const respose = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL + `/businesses/${id}?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
      },
    })
    const Getdata = await respose.json();
    const data = Getdata.data
    console.log("🚀 ~ file: page.tsx:49 ~ getNegocio ~ data:", data)
    setnBusiness(data.attributes.nBusiness);
    setApproach(data.attributes.Approach);
    setBudget(data.attributes.Budget);
    setStatus(data.attributes.andamento);
    setDeadline(data.attributes.deadline);
    setDataRetorno(data.attributes.DataRetorno);
    setHistoria(data.attributes.history);
    setChatHistory(data.attributes.incidentRecord);
    setEtapa(data.attributes.etapa);
    setMperca(data.attributes.Mperca);
  }
  getNegocio()

 

  // useEffect(() => {
  //   if (msg) {
  //     (async () => {
  //       setLoading(true);
  //       const url = "/api/db/business/get/id/" + id;
  //       console.log(url);
  //       //cunsulta informações gerais do cliente
  //       await axios({
  //         method: "GET",
  //         url: url,
  //       })
  //         .then((res) => {
  //           // console.log(res.data.attributes);
  //           setChatHistory(res.data.attributes.incidentRecord);
  //           // fim do loading
  //           setLoading(false);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           toast({
  //             title: "Ops",
  //             description: "erro ao recuperar as informações",
  //             status: "error",
  //             duration: 9000,
  //             isClosable: true,
  //           });
  //           // fim do loading
  //           setLoading(false);
  //         });
  //     })();
  //   }
  // }, [msg]);

  function getMsg(menssage: React.SetStateAction<any>) {
    setMsg(menssage);
  }

  // if (loadingGeral) {
  //   return <Loading size="200px">Carregando...</Loading>;
  // }

  return (
    <>
      <Flex w="100%" h="100vh" flexDirection={'column'} justifyContent={'space-between'}>
        <Box>

        </Box>
        <Box bg={"gray.200"} w="full" p={5}>
          <NegocioHeader
            id={id}
            nBusiness={nBusiness}
            Approach={Approach}
            Budget={Budget}
            Status={Status}
            Deadline={Deadline}
            historia={Historia}
            DataRetorno={DataRetorno}
            Mperca={Mperca}
            etapa={Etapa}
          />
        </Box>
        <Box bg="#edeae6" w="full" h={'full'} ref={divRef} overflowY={"auto"}>
          <BodyChat conteudo={ChatHistory} loading={loading} />
        </Box>
        <Box w="full">
          <NegocioFooter data={ChatHistory} onGetValue={getMsg} id={id} />
        </Box>
      </Flex>
    </>
  );
}
