'use client'
import { BtCreate } from "@/components/negocio/BtcreateN";
import { BodyCard } from "@/components/negocio/card";
import {
  Box,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Nogocios() {

  const [load, setLoad] = useState<boolean>(false);

  function tragetReload(Loading: boolean | ((prevState: boolean) => boolean)) {
    setLoad(Loading);
  }
  function tragetOnload() {
    if(load){
      setLoad(false);
    }
  }

  return (
    <>
      <Flex h="100%" w="100%" flexDir={"column"} justifyContent="center">
        <Flex
          h={16}
          w={{ md: "80%", sm: "100%" }}
          borderBottom={"2px"}
          borderColor={"gray.200"}
          m="auto"
          mt={{ md: 5, sm: "1.5rem" }}
          alignItems={"center"}
        >

          <BtCreate onLoading={tragetReload} />
        </Flex>
        <Box h={"95%"} overflow={"auto"}>
          <Flex
            bg="#edf3f8"
            pt={"3rem"}
            pb={"2rem"}
            px={"2rem"}
            h="100%"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap={5}
          >
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
                  <BodyCard loading={load} onload={tragetOnload}/>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}