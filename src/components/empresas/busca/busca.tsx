import { Flex, FormLabel, Input } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"


export const BuscaInput = (props:{ onResponse: any}) =>{
  const [Pesquisa, setPesquisa] = useState<string|any>('')

useEffect(()=>{
  props.onResponse(Pesquisa)
},[Pesquisa, props])

  
  return(
    <>
     <Flex gap="1rem" alignItems={"center"} w={{ sm: "100%", md: "35%" }}>
            <FormLabel
              w='25rem'
              fontSize="lg"
              fontWeight="md"
              color="gray.700"
              textTransform="capitalize"
              letterSpacing="wide"
            >
              Busca por empresa
            </FormLabel>
            <Input
              type="text"
              borderColor="gray.600"
              focusBorderColor="brand.400"
              size="md"
              w="35rem"
              fontSize="md"
              rounded="md"
              onChange={(e) => setPesquisa(e.target.value)}
              value={Pesquisa}
            />

          </Flex>
    </>
  )
}