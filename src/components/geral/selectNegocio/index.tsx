
import { EtapasNegocio } from '@/components/data/etapaNegocio';
import { Box, FormLabel, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const SelecNegocio = (props: { Resp: string; onAddResp: any }) => {
  const [valor, setValor] = useState('');

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
        Etapa do Negócio
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
        {EtapasNegocio.map((i: any) => (
          <option key={i.id} value={i.id}>
            {i.title}
          </option>
        ))}
      </Select>
    </Box>
  );
};
