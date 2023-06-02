import { Box, FormLabel, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";


export const SelectMPerca = (props: { Resp: number; onAddResp: any }) => {
  const [dados, setDados] = useState([])
  const [valor, setValor] = useState<number>();

  useEffect(() => {
    (async () => {
      const reqest = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/bt-m-percas`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
          "Content-Type": "application/json"
        }
      })
      const data = await reqest.json()
      const dados = data.data
      setDados(dados)
    })()
  }, [])
  
  function atualizarValor(event: any) {
    setValor(event.target.value);
    props.onAddResp(event.target.value);
  }

  useEffect(() => {
    setValor(props.Resp);
  }, [props.Resp]);

  return (
    <Box>
      <FormLabel
        htmlFor="cidade"
        fontSize="xs"
        fontWeight="md"
        color="gray.700"
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
        onChange={atualizarValor}
        value={valor}
      >
        {dados.map((item: any) => (
          <option key={item.id} value={item.id}>{item.attributes.titulo}</option>
        ))}
      </Select>
    </Box>
  );
};
