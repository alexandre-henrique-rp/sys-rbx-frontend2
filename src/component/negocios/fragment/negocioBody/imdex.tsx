import Loading from '@/component/elements/loading';
import { Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';


interface MyTextAreaElement extends HTMLTextAreaElement {}

export const BodyChat = (props: { conteudo?: any; loading: boolean }) => {
  const textareaRef = useRef<MyTextAreaElement>(null);
  const [Load, setLoad] = useState(false);
  const [data, setData] = useState<any | null>([]);
  
  useEffect(() => {
    setLoad(props.loading);
    setData(props.conteudo);
  }, [props.conteudo, props.loading]);

  useEffect(() => {
    if (textareaRef.current) {
      (textareaRef.current as HTMLTextAreaElement).style.height = 'auto';
      (textareaRef.current as HTMLTextAreaElement).style.height = `${textareaRef.current.scrollHeight}px`;
      (textareaRef.current as HTMLTextAreaElement).style.width = 'auto';
      (textareaRef.current as HTMLTextAreaElement).style.width = `${textareaRef.current.scrollWidth}px`;
    }
  }, [data]);

  if (Load) {
    return <Loading size="200px">Carregando...</Loading>;
  }

  const estiloMensagem = {
    mensagemSistema: {
      backgroundColor: '#dcf8c6',
      color: '#2D3748',
      alignSelf: 'flex-start',
    },
    mensagemUsuario: {
      backgroundColor: '#EDF2F7',
      color: '#2D3748',
      alignSelf: 'flex-end',
    },
  };

  return (
    <Box display={'flex'} flexDirection={'column'} w={'100%'} p={5}>
      {!data? null : data.map((mensagem: any, index: number) => {
        const estilo =
          mensagem.user === 'Sistema'
            ? estiloMensagem.mensagemSistema
            : estiloMensagem.mensagemUsuario;

        const dateFormate = new Date(mensagem.date).toLocaleString();
        return (
          <Box
            key={index}
            maxW={'65%'}
            style={estilo}
            p={2}
            borderRadius="md"
            mb={2}
          >
            <Box fontSize="13px" fontWeight="bold" mb={3}>
              {mensagem.user}
            </Box>
            <Box
              whiteSpace="pre-wrap"
              w={'100%'}
              fontSize="12px"
              dangerouslySetInnerHTML={{ __html: mensagem.msg }}
            ></Box>
            <Box
              fontSize="10px"
              mt={2}
              textDecoration={'underline'}
              textAlign={'end'}
            >
              {dateFormate}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
