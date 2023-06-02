import Loading from "@/component/elements/loading";
import { BtmNegocioCreate } from "@/component/negocios/fragment/btmCreate";
import { NegocioCard } from "@/component/negocios/fragment/card";
import {
  Box,
  Flex,
} from "@chakra-ui/react";
import { use, useEffect, useState } from "react";


export default function Negocios() {
  const [load, setLoad] = useState<boolean>(false);
  const [dados, setDados] = useState<any>([])
  
  useEffect(()=>{
    (async() => {
      setLoad(true);
      const request = await fetch('/api/negocios/get')
      const response = await request.json()
      setDados(response)
      setLoad(false);
    })()
  }, [])
  

  function tragetReload(Loading: boolean | ((prevState: boolean) => boolean)) {
    console.log('aki')
    console.log(Loading)
    setLoad(Loading);
    const Reload = async () => {
      const request = await fetch('/api/negocios/get')
      const response = await request.json()
      setDados(response)
    }
    Reload()
    setLoad(false);
  }

  if (load) {
    return <Loading size="200px">Carregando...</Loading>;
  }

  return (
    <>
      <Flex h="100%" w="100%" flexDir={"column"} justifyContent="center">
        <Flex
          h={12}
          w='100%'
          borderBottom={"2px"}
          borderColor={"gray.200"}
          m="auto"
          my='0.5rem'
          alignItems={"center"}
          justifyContent={'end'}
        >
          <BtmNegocioCreate onLoading={tragetReload} setLoading={load} />
        </Flex>
        <Box h={"95%"} overflow={"auto"}>
          <Flex
            bg="#edf3f8"
            h="100%"
            justifyContent="center"
          >
            <NegocioCard data={dados} />
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
