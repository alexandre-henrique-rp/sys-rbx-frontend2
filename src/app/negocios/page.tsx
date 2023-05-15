'use client'
import {
  Box,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Nogocios() {

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
          <BodyCard reload={load} />
        </Flex>
      </Box>
    </Flex>
  </>
  )
}