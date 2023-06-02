import { Button } from "@chakra-ui/react";

export const BTMPdf = (props: { nPedido: any }) => {
  return (
    <>
      <Button p={3} fontSize={'0.9rem'} colorScheme={"whatsapp"} onClick={() => window.open(
        `/api/propostas/pdf/${props.nPedido}`,
        "_blank"
      )}>
        Gerar PDF
      </Button>
    </>
  );
};
