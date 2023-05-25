import { Box, FormLabel, Input } from '@chakra-ui/react';

export const CompBusiness = (props: { Resp: string }) => {
  return (
    <Box>
      <FormLabel
        fontSize="10px"
        fontWeight="md"
        color="gray.700"
      >
        N° Negócio
      </FormLabel>
      <Input
        focusBorderColor="brand.400"
        shadow="sm"
        size="xs"
        w="full"
        fontSize="10px"
        rounded="md"
        value={props.Resp}
      />
    </Box>
  );
};
