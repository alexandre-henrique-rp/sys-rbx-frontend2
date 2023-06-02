import { Box, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const ImputRetorno = (props: { Resp: number; onAddResp: any }) => {
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
        htmlFor="cidade"
        fontSize="xs"
        fontWeight="md"
        color="gray.700"
      >
        Data de retorno
      </FormLabel>
      <Input
        shadow="sm"
        size="sm"
        w="full"
        type={"date"}
        fontSize="xs"
        rounded="md"
        border={'1px solid #6666'}
        onChange={atualizarValor}
        value={valor}
      />
    </Box>
  );
};
