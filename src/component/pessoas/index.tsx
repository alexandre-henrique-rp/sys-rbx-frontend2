import { capitalizeWords } from '@/function/string';
import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Textarea,
  Toast,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { cpf } from 'cpf-cnpj-validator';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { mask, unMask } from 'remask';

export const FormPessoa = (props: { data?: any }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const toast = useToast();
  const [nome, setNome] = useState('');
  const [ID, setID] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [obs, setObs] = useState('');
  const [CPF, setCPF] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [complemento, setComplemento] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [whatsappMask, setWhatsappMask] = useState('');
  const [telefoneMask, setTelefoneMask] = useState('');
  const [CepMask, setCepMask] = useState('');
  const [CpfMask, setCpfMask] = useState('');
  const [Departamento, setDepartamento] = useState('');
  const [Cargo, setCargo] = useState('');
  const [historico, sethistorico] = useState([]);
  const [Atualizar, setAtualizar] = useState(false);

  useEffect(() => {
    if (props.data) {
      const data = props.data;
      const pessoa = data.attributes

      setID(data.id)
      setNome(capitalizeWords(pessoa.nome));
      setWhatsapp(pessoa.whatsapp);
      setWhatsappMask(mask(pessoa.whatsapp, ['(99) 9 9999-9999']));
      setTelefone(pessoa.telefone);
      setTelefoneMask(mask(pessoa.telefone, ['(99) 9999-9999']));
      setEmail(pessoa.email);
      setObs(pessoa.obs);
      setCPF(pessoa.CPF);
      setCpfMask(mask(pessoa.CPF, ['999.999.999-99']));
      setCep(pessoa.CEP);
      setCepMask(mask(pessoa.CEP, ['99.999-999']));
      setEndereco(capitalizeWords(pessoa.endereco));
      setNumero(pessoa.numero);
      setBairro(capitalizeWords(pessoa.bairro));
      setCidade(capitalizeWords(pessoa.cidade));
      setUf(pessoa.uf);
      setDepartamento(capitalizeWords(pessoa.departamento));
      setCargo(capitalizeWords(pessoa.cargo));
      sethistorico(pessoa.history);
      setAtualizar(true)
    };
  }, [props.data]);

  const checkCep = async () => {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    await axios(url)
      .then((res) => {
        setEndereco(res.data.logradouro);
        setCidade(res.data.localidade);
        setBairro(res.data.bairro);
        setUf(res.data.uf);
      })
      .catch((err) => console.log(err));
  };

  const MaskWhatsapp = (e: any) => {
    const originalVelue = unMask(e.target.value);
    const maskedValue = mask(originalVelue, ['(99) 9 9999-9999']);
    setWhatsapp(originalVelue);
    setWhatsappMask(maskedValue);
  };

  const MaskTel = (e: any) => {
    const originalVelue = unMask(e.target.value);
    const maskedValue = mask(originalVelue, ['(99) 9999-9999']);
    setTelefone(originalVelue);
    setTelefoneMask(maskedValue);
  };

  const MaskCpf = (e: any) => {
    const originalVelue = unMask(e.target.value);
    const maskedValue = mask(originalVelue, ['999.999.999-99']);
    setCPF(originalVelue);
    setCpfMask(maskedValue);
  };

  const CEP = (e: any) => {
    const originalVelue = unMask(e.target.value);
    const maskedValue = mask(originalVelue, ['99.999-999']);
    setCepMask(maskedValue);
    setCep(originalVelue);
  };

  const NUMERO = (e: any) => {
    const data = e.target.value.replace(/[a-zA-Z]+/g, '');
    setNumero(data);
  };

  const save = async () => {
    const date = new Date();
    const dateIsso = date.toISOString();

    const historicoAt = {
      date: dateIsso,
      vendedor: session?.user.name,
      msg: `cinete ${nome} foi atualizado`,
    };

    const data = {
      data: {
        nome: nome,
        whatsapp: whatsapp,
        telefone: telefone,
        email: email,
        CPF: CPF,
        CEP: cep,
        uf: uf,
        endereco: endereco,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        obs: obs,
        status: true,
        history: [...historico, historicoAt],
        departamento: Departamento,
        cargo: Cargo,
        complemento: complemento,
        apiauthorization: session?.user.email
      },
    };

    if (!nome) {
      toast({
        title: 'Como devemos chamar esse cliente',
        description: 'Obrigatorio ter o nome do cliente!',
        status: 'warning',
        duration: 6000,
        isClosable: true,
      });
    } else if (!telefone && !whatsapp) {
      toast({
        title: 'Sem numero de contato',
        description: 'É nessesario o numero de WhatsApp!',
        status: 'warning',
        duration: 6000,
        isClosable: true,
      });
    }

    if (Atualizar) {
      await axios({
        method: 'PUT',
        url: `/api/pessoas/put/${ID}`,
        data: data
      })
        .then((retorno: any) => {
          console.log(retorno)
          toast({
            title: "Cliente criado com sucesso",
            description: retorno,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          router.push('/pessoas');
        })
        .catch((error: any) => {
          toast({
            title: "Ops! Ocorreu um erro",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        })
    } else {
      await axios({
        method: 'POST',
        url:'/api/pessoas/post',
        data: data
      })
        
        .then((retorno: any) => {
          console.log(retorno.data)
          toast({
            title: "Cliente criado com sucesso",
            description: retorno.data,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          router.push('/pessoas');
        })
        .catch((error: any) => {
          toast({
            title: "Ops! Ocorreu um erro",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        })
    }
  };

  return (
    <>
      <Flex justifyContent={"center"} alignItems={"center"} h={"100vh"}>
        <Box
          _dark={{
            bg: "#111",
          }}
          px={5}
          pt={3}
        >
          <Box mt={[5, 0]}>
            <SimpleGrid
              display={{
                base: "initial",
                md: "grid",
              }}
              columns={{
                md: 1,
              }}
              spacing={{
                md: 6,
              }}
            >
              <GridItem
                mt={[5, null, 0]}
                colSpan={{
                  md: 2,
                }}
                border={"1px solid"}
                borderColor={"blackAlpha.400"}
                rounded={20}
                bg="#edf3f8"
              >
                <chakra.form
                  shadow="base"
                  rounded={[null, 20]}
                  overflow={{
                    sm: "hidden",
                  }}
                >
                  <Stack
                    px={4}
                    py={3}
                    _dark={{
                      bg: "#141517",
                    }}
                    spacing={6}
                  >
                    <SimpleGrid columns={12} spacing={3}>
                      <Heading as={GridItem} colSpan={12} size="lg">
                        Cadastro de cliente
                      </Heading>
                    </SimpleGrid>
                    <Heading as={GridItem} colSpan={12} size="sd">
                      Dados do Cliente
                    </Heading>
                    <SimpleGrid columns={9} spacing={3}>
                      <FormControl as={GridItem} colSpan={[12, 5, 2]}>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Nome
                        </FormLabel>
                        <Input
                          type="text"
                          placeholder="nome completo"
                          borderColor="gray.600"
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="xs"
                          w="full"
                          rounded="md"
                          onChange={(e: any) => setNome(capitalizeWords(e.target.value))}
                          value={nome}
                        />
                      </FormControl>

                      <FormControl as={GridItem} colSpan={[12, 5, 2]}>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          CPF
                        </FormLabel>
                        <Input
                          type="text"
                          placeholder="CPF"
                          borderColor="gray.600"
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="xs"
                          w="full"
                          rounded="md"

                          onChange={MaskCpf}
                          onBlur={(e: any) => {
                            const cpfv = unMask(e.target.value);
                            const validcpf = cpf.isValid(cpfv);

                            if (cpfv.length < 11) {
                              Toast({
                                title: "erro no CPF",
                                description: "CPF menor que esperado",
                                status: "error",
                                duration: 7000,
                                position: "top-right",
                                isClosable: true,
                              });
                            }
                            if (cpfv.length > 11) {
                              Toast({
                                title: "erro no CPF",
                                description: "CPF imcompativel",
                                status: "error",
                                duration: 7000,
                                position: "top-right",
                                isClosable: true,
                              });
                            }

                            if (validcpf === false) {
                              Toast({
                                title: "erro no CPF",
                                description: "CPF incorreto",
                                status: "error",
                                duration: 7000,
                                position: "top-right",
                                isClosable: true,
                              });
                            }
                          }}
                          value={CpfMask}
                        />
                      </FormControl>

                      <FormControl as={GridItem} colSpan={[12, 3, null, 1]}>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Cep
                        </FormLabel>
                        <Input
                          type="text"
                          placeholder="cep"
                          borderColor="gray.600"
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="xs"
                          w="full"
                          rounded="md"

                          onChange={CEP}
                          onBlur={checkCep}
                          value={CepMask}
                        />
                      </FormControl>

                      <FormControl as={GridItem} colSpan={[12, 5, 2]}>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Endereço
                        </FormLabel>
                        <Input
                          type="text"
                          borderColor="gray.600"
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="xs"
                          w="full"
                          rounded="md"

                          onChange={(e: any) => setEndereco(capitalizeWords(e.target.value))}
                          value={endereco}
                        />
                      </FormControl>

                      <FormControl as={GridItem} colSpan={[12, 5, 3]}>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Complemento
                        </FormLabel>
                        <Input
                          type="text"
                          borderColor="gray.600"
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="xs"
                          w="full"
                          rounded="md"

                          onChange={(e: any) => setComplemento(capitalizeWords(e.target.value))}
                          value={complemento}
                        />
                      </FormControl>

                      <FormControl as={GridItem} colSpan={[12, 3, null, 1]}>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Nº
                        </FormLabel>
                        <Input
                          type="text"
                          borderColor="gray.600"
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="xs"
                          w="full"
                          rounded="md"
                          onChange={NUMERO}
                          value={numero}
                        />
                      </FormControl>

                      <FormControl as={GridItem} colSpan={[12, 5, 2]}>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Cidade
                        </FormLabel>
                        <Input
                          type="text"
                          borderColor="gray.600"
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="xs"
                          w="full"
                          rounded="md"
                          onChange={(e: any) => setCidade(capitalizeWords(e.target.value))}
                          value={cidade}
                        />
                      </FormControl>

                      <FormControl as={GridItem} colSpan={[12, 5, 2]}>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Bairro
                        </FormLabel>
                        <Input
                          type="text"
                          borderColor="gray.600"
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="xs"
                          w="full"
                          rounded="md"
                          onChange={(e: any) => setBairro(capitalizeWords(e.target.value))}
                          value={bairro}
                        />
                      </FormControl>

                      <FormControl as={GridItem} colSpan={[12, 3, null, 1]}>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          UF.
                        </FormLabel>
                        <Input
                          type="text"
                          borderColor="gray.600"
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="xs"
                          w="full"
                          rounded="md"
                          onChange={(e: any) => setUf(e.target.value)}
                          value={uf}
                        />
                      </FormControl>

                      <FormControl as={GridItem} colSpan={[12, 6, 2]}>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          E-mail
                        </FormLabel>
                        <Input
                          type="text"
                          placeholder="email.email@email.com.br"
                          borderColor="gray.600"
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="xs"
                          w="full"
                          rounded="md"
                          onChange={(e: any) => setEmail(e.target.value)}
                          value={email}
                        />
                      </FormControl>
                      <FormControl as={GridItem} colSpan={[12, 3, null, 1]}>
                        <FormLabel
                          htmlFor="cep"
                          fontSize="xs"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Telefone
                        </FormLabel>
                        <Input
                          type="text"
                          placeholder="(00) 0000-0000"
                          borderColor="gray.600"
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="xs"
                          w="full"
                          rounded="md"
                          onChange={MaskTel}
                          value={telefoneMask}
                        />
                      </FormControl>

                      <FormControl as={GridItem} colSpan={[12, 6, null, 1]}>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Whatsapp
                        </FormLabel>
                        <Input
                          type="text"
                          placeholder="(00) 0 0000-0000"
                          borderColor="gray.600"
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="xs"
                          w="full"
                          rounded="md"
                          onChange={MaskWhatsapp}
                          value={whatsappMask}
                        />
                      </FormControl>
                      <FormControl as={GridItem} colSpan={[12, 6, null, 2]}>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Departamento
                        </FormLabel>
                        <Input
                          type="text"
                          borderColor="gray.600"
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="xs"
                          w="full"
                          rounded="md"
                          onChange={(e) => setDepartamento(capitalizeWords(e.target.value))}
                          value={Departamento}
                        />
                      </FormControl>
                      <FormControl as={GridItem} colSpan={[12, 6, null, 2]}>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="md"
                          color="gray.700"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          Cargo
                        </FormLabel>
                        <Input
                          type="text"
                          borderColor="gray.600"
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="xs"
                          w="full"
                          rounded="md"
                          onChange={(e) => setCargo(capitalizeWords(e.target.value))}
                          value={Cargo}
                        />
                      </FormControl>
                    </SimpleGrid>
                  </Stack>
                  <Stack
                    px={4}
                    py={3}
                    _dark={{
                      bg: "#141517",
                    }}
                    spacing={3}
                  >
                    <SimpleGrid columns={12} spacing={3}>
                      <Heading as={GridItem} colSpan={12} size="sd">
                        Observações
                      </Heading>
                      <Box as={GridItem} colSpan={12} m="auto">
                        <Textarea
                          w={["80vw", "70vw"]}
                          borderColor="gray.500"
                          placeholder="Especifique aqui, todos os detalhes do cliente"
                          size="sm"
                          resize={"none"}
                          onChange={(e: any) => setObs(capitalizeWords(e.target.value))}
                          value={obs}
                        />
                      </Box>
                    </SimpleGrid>
                  </Stack>
                  <Box
                    px={{
                      base: 4,
                      sm: 6,
                    }}
                    py={5}
                    pb={[12, null, 5]}
                    _dark={{
                      bg: "#121212",
                    }}
                    textAlign="right"
                  >
                    <Button
                      type="submit"
                      colorScheme="red"
                      me={5}
                      _focus={{
                        shadow: "",
                      }}
                      fontWeight="md"
                      onClick={() => router.push('/empresas')}
                    >
                      Cancelar
                    </Button>
                    <Button
                      colorScheme="whatsapp"
                      _focus={{
                        shadow: "",
                      }}
                      fontWeight="md"
                      onClick={save}
                    >
                      Salvar
                    </Button>
                  </Box>
                </chakra.form>
              </GridItem>
            </SimpleGrid>
          </Box>
        </Box>
      </Flex>
    </>
  );
}