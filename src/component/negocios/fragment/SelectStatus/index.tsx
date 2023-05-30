import { Box, FormLabel, Select } from "@chakra-ui/react";
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect, useState } from "react";

export const getStaticProps: GetStaticProps<{
  dados: any;
}> = async () => {
  const reqest = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/bt-statuses`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
      "Content-Type": "application/json"
    }
  })
  const data = await reqest.json()
  const dados = data.data
  return {
    props: {
      dados
    }
  }
}

export const SelectStatus = (props: { Resp: number; onAddResp: any }, { dados }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [valor, setValor] = useState<number>();

  useEffect(() => {
    setValor(props.Resp);
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
        <option value=""> </option>
        {dados.map((item: any) => (
          <option key={item.id} value={item.id}>{item.nome}</option>
        ))}
      </Select>
    </Box>
  );
};
