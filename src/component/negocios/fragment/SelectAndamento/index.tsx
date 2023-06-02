import { Box, FormLabel, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const SelecAtendimento = (props: { Resp: string; onAddResp: any }) => {
  const [dados, setDados] = useState([])
  const [valor, setValor] = useState('');
  
  useEffect(() => {
    (async () => {
      const reqest = await fetch(`/api/lib/atendimento`)
      const data = await reqest.json()
      setDados(data)
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
        _dark={{
          color: 'gray.50',
        }}
      >
        Atendimento
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
          <option key={item.id} value={item.attributes.key}>{item.attributes.nome}</option>
        ))}
      </Select>
    </Box>
  );
};
