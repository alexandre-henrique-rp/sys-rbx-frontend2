import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useState } from "react";
import { CardList } from "@/component/proposta/fragment/card";

export default function ListaProposta() {
  const router = useRouter();
  const ID: any = router.query.id;

  return (
    <>
      <Flex h="100%" w="100%" flexDir={"column"} justifyContent="center">
        <Flex
          w="100%"
          borderBottom={"2px"}
          borderColor={"gray.200"}
          justifyContent={"space-between"}
          alignItems={"center"}
          h={"8%"}
        >
          <Box ms={16}>
            <BsArrowLeftCircleFill
              color="blue"
              cursor={'pointer'}
              size={30}
              onClick={() => router.push('/negocios/' + ID)}
            />
          </Box>
          <Button
            my={'3'}
            me={16}
            colorScheme="whatsapp"
            onClick={() => {
              localStorage.setItem("id", ID);
              router.push("/propostas/create");
            }}
          >
            Nova Proposta
          </Button>
        </Flex>
        <Box h={"92%"}>
          <Flex
            bg="#ced3d8"
            pt={"1rem"}
            pb={"0.5rem"}
            px={"1rem"}
            h="full"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
              <CardList id={ID} />
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
