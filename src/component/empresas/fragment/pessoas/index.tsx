import { Box, Button, Flex, FormLabel, Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const CompPessoa = (props: { Resp?: string; onAddResp: any }) => {
  const [dados, setDados] = useState<any>(null);
  const [valor, setValor] = useState('');
  const { push } = useRouter()
 
  useEffect(() => {
    (async()=>{
      const response = await fetch('/api/empresas/get/list_represantante')
      const data = await response.json();
      setDados(data);
    })()
  }, [props.Resp]);

  useEffect(() => {
    if(props.Resp){
      setValor(props.Resp);
    }
  }, [props.Resp]);
  
  function atualizarValor(event: any) {
    setValor(event.target.value);
    props.onAddResp(event.target.value);
  }

  return (
    <Flex gap={3} alignItems={'center'}>
    <Box w={'15rem'}>
      <FormLabel
        fontSize="xs"
        fontWeight="md"
        color="gray.700"
        _dark={{
          color: 'gray.50',
        }}
      >
        Responsável
      </FormLabel>
      <Select
        borderColor="gray.600"
        focusBorderColor="brand.400"
        shadow="sm"
        size="xs"
        w="full"
        fontSize="xs"
        rounded="md"
        placeholder=" "
        onChange={atualizarValor}
        value={valor}
      >
        <option value="1">não tem</option>
        {!dados
          ? null
          : dados.map((i: any) => {
              return (
                <option key={i.id} value={i.id}>
                  {i.attributes.nome}
                </option>
              );
            })}
      </Select>
    </Box>
    <Box mt={4}>
    <Button colorScheme="facebook" onClick={()=> push(`/pessoas/${valor}`)}>Editar reponsavel</Button>
    </Box>
    <Box mt={4}>
    <Button colorScheme="teal" onClick={()=> push(`/pessoas/cadastro`)}>Adicionar reponsavel</Button>
    </Box>
    </Flex>
  );
}