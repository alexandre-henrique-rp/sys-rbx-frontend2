import { FormLabel, Input } from '@chakra-ui/react';
import { memo } from 'react';

const ListaEmpresa = (props: { onChangeValue: any }) => { 

  return (
    <>
      <FormLabel
        fontSize="10px"
        fontWeight="md"
        color="gray.700"
        _dark={{
          color: 'gray.50',
        }}
      >
        Empresas
      </FormLabel>
      <Input
        shadow="sm"
        size="xs"
        w="full"
        fontSize="10px"
        rounded="md"
        value={props.onChangeValue}
      />
    </>
  );
};

export default memo(ListaEmpresa)