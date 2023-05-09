"use client"
import { Box, FormLabel, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";



export const CompPessoa = (props: { Resp?: string; onAddResp: any }) => {
  const [dados, setDados] = useState<any>(null);
  const [valor, setValor] = useState('');
 
  useEffect(() => {
    if(props.Resp){
      setValor(props.Resp);
    }
    (async()=>{
      const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL +
        '/pessoas?fields[0]=nome&filters[status][$eq]=true', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
        },
        cache: 'no-store'
        // a padrão é a cache:'force-cache' essa função faz qcom que a requisição seja unica pelo servidor deixando a pagina estatica
        // para deixar dinamica vamos usar o cache: 'no-store' 
      })
      const data = await response.json();
      setDados(data.data);
    })()
  }, [props.Resp]);
  
  
  function atualizarValor(event: any) {
    setValor(event.target.value);
    props.onAddResp(event.target.value);
  }

  return (
    <Box>
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
  );
}