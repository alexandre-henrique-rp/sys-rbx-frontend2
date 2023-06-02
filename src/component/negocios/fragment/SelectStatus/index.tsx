import { Box, FormLabel, Select } from "@chakra-ui/react";
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect, useState } from "react";

export const SelectStatus = (props: { Resp: number; onAddResp: any }) => {
  const [valor, setValor] = useState<number>();
  const [dados, setDados] = useState([])
  console.log("🚀 ~ file: index.tsx:8 ~ SelectStatus ~ dados:", dados)

  useEffect(() => {
    (async () => {
      const reqest = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/bt-statuses`, {
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
        fontSize="xs"
        fontWeight="md"
        color="gray.700"
      >
        Status
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
          <option key={item.id} value={item.id}>{item.attributes.nome}</option>
        ))}
      </Select>
    </Box>
  );
};
