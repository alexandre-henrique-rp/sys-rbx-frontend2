"use client"
import { confgEnb } from '@/components/data/confgEnb';
import { modCaix } from '@/components/data/modCaix';
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
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  Toast,
  useToast,
} from '@chakra-ui/react';
import { cnpj } from "cpf-cnpj-validator";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { mask, unMask } from 'remask';
import { CompPessoa } from '../listResp';
import { useSession } from "next-auth/react";


export const FormEmpresa = (props: { Data?: any }) => {
  const router = useRouter();
  // const { data: session } = useSession();
  const [CNPJ, setCNPJ] = useState('');
  const [MaskCNPJ, setMaskCNPJ] = useState('');
  const [nome, setNome] = useState('');
  const [fantasia, setFantasia] = useState('');
  const [tipoPessoa, setTipoPessoa] = useState('');
  const [fone, setFone] = useState('');
  const [celular, setCelular] = useState('');
  const [WhatsMask, setWhatsMask] = useState('');
  const [email, setEmail] = useState('');
  const [emailNfe, setEmailNfe] = useState('');
  const [ieStatus, setIeStatus] = useState(false);
  const [CNAE, setCNAE] = useState('');
  const [Ie, setIE] = useState('');
  const [porte, setPorte] = useState('');
  const [simples, setSimples] = useState(false);
  const [site, setSite] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [cep, setCep] = useState('');
  const [pais, setPais] = useState('');
  const [codpais, setCodpais] = useState('');
  const [contribuinte, setContribuinte] = useState('');
  const [adFrailLat, setAdFragilLat] = useState(false);
  const [adFrailCab, setAdFragilCab] = useState(false);
  const [adEspecialLat, setAdEspecialLat] = useState(false);
  const [adEspecialCab, setAdEspecialCab] = useState(false);
  const [latFCab, setLatFCab] = useState(false);
  const [cabChao, setCabChao] = useState(false);
  const [cabTop, setCabTop] = useState(false);
  const [cxEco, setCxEco] = useState(false);
  const [cxEst, setCxEst] = useState(false);
  const [cxLev, setCxLev] = useState(false);
  const [cxRef, setCxRef] = useState(false);
  const [cxSupRef, setCxSupRef] = useState(false);
  const [platSMed, setPlatSMed] = useState(false);
  const [cxResi, setCxResi] = useState(false);
  const [engEco, setEngEco] = useState(false);
  const [engLev, setEngLev] = useState(false);
  const [engRef, setEngRef] = useState(false);
  const [engResi, setEngResi] = useState(false);
  const [tablecalc, setTablecalc] = useState('');
  const [maxPg, setMaxpg] = useState('');
  const [forpg, setForpg] = useState('');
  const [frete, setFrete] = useState('');
  const [status, setStatus] = useState(false);
  const [ID, setID] = useState('');
  const [Responsavel, setResponsavel] = useState('');
  const toast = useToast();



  useEffect(() => {
    const empresa = props.Data
    if (empresa) {
      setID(empresa.id);
      setResponsavel(empresa.attributes.responsavel.data?.id);
      setCNPJ(empresa.attributes.CNPJ);
      setNome(empresa.attributes.nome);
      setFantasia(empresa.attributes.fantasia);
      setTipoPessoa(empresa.attributes.tipoPessoa);
      setFone(empresa.attributes.fone);
      setCelular(empresa.attributes.celular);
      setEmail(empresa.attributes.email);
      setEmailNfe(empresa.attributes.emailNfe);
      setIeStatus(empresa.attributes.ieStatus);
      setCNAE(empresa.attributes.CNAE);
      setIE(empresa.attributes.Ie);
      setPorte(empresa.attributes.porte);
      setSimples(empresa.attributes.simples);
      setSite(empresa.attributes.site);
      setEndereco(empresa.attributes.endereco);
      setNumero(empresa.attributes.numero);
      setBairro(empresa.attributes.bairro);
      setComplemento(empresa.attributes.complemento);
      setCidade(empresa.attributes.cidade);
      setUf(empresa.attributes.uf);
      setCep(empresa.attributes.cep);
      setPais(empresa.attributes.pais);
      setCodpais(empresa.attributes.codpais);
      setAdFragilLat(empresa.attributes.adFrailLat);
      setAdFragilCab(empresa.attributes.adFrailCab);
      setAdEspecialLat(empresa.attributes.adEspecialLat);
      setAdEspecialCab(empresa.attributes.adEspecialCab);
      setLatFCab(empresa.attributes.latFCab);
      setCabChao(empresa.attributes.cabChao);
      setCabTop(empresa.attributes.cabTop);
      setCxEco(empresa.attributes.cxEco);
      setCxEst(empresa.attributes.cxEst);
      setCxLev(empresa.attributes.cxLev);
      setCxRef(empresa.attributes.cxRef);
      setCxSupRef(empresa.attributes.cxSupRef);
      setPlatSMed(empresa.attributes.platSMed);
      setCxResi(empresa.attributes.cxResi);
      setEngEco(empresa.attributes.engEco);
      setEngLev(empresa.attributes.engLev);
      setEngRef(empresa.attributes.engRef);
      setEngResi(empresa.attributes.engResi);
      setTablecalc(empresa.attributes.tablecalc);
      setMaxpg(empresa.attributes.maxPg);
      setForpg(empresa.attributes.forpg);
      setFrete(empresa.attributes.frete);
      setStatus(empresa.attributes.status);
    }
  }, [props.Data]);

  const consulta = async () => {

    const validCnpj = cnpj.isValid(CNPJ);
    if (CNPJ.length < 13) {
      toast({
        title: 'erro no CNPJ',
        description: 'CNPJ incorreto',
        status: 'error',
        duration: 7000,
        position: 'top-right',
        isClosable: true,
      });
    }
    if (validCnpj === false) {
      toast({
        title: 'erro no CNPJ',
        description: 'CNPJ incorreto',
        status: 'error',
        duration: 7000,
        position: 'top-right',
        isClosable: true,
      });
    } else {
      const consult = await fetch('https://publica.cnpj.ws/cnpj/' + CNPJ);
      const response: any = await consult.json();
      console.log("🚀 ~ file: index.tsx:168 ~ consulta ~ response:", response)

      setNome(response.razao_social);
      setFantasia(response.estabelecimento.nome_fantasia);
      setTipoPessoa('cnpj');
      setIE(
        response.estabelecimento.inscricoes_estaduais[0]
          .inscricao_estadual,
      );
      setIeStatus(
        response.estabelecimento.inscricoes_estaduais[0].ativo,
      );
      setEndereco(
        response.estabelecimento.tipo_logradouro +
        ' ' +
        response.estabelecimento.logradouro,
      );
      setNumero(response.estabelecimento.numero);
      setComplemento(response.estabelecimento.complemento);
      setBairro(response.estabelecimento.bairro);
      setCep(response.estabelecimento.cep);
      setCidade(response.estabelecimento.cidade.nome);
      setUf(response.estabelecimento.estado.sigla);
      let ddd = response.estabelecimento.ddd1;
      let tel1 = response.estabelecimento.telefone1;
      setFone(ddd + tel1);
      setEmail(response.estabelecimento.email);
      setPais(response.estabelecimento.pais.nome);
      setCodpais(response.estabelecimento.pais.id);
      setCNAE(response.estabelecimento.atividade_principal.id);
      setPorte(response.porte.descricao);
      const cheksimples =
        response.simples === null
          ? false
          : response.simples.simples === 'Sim'
            ? true
            : false;
      setSimples(cheksimples);
    }
  };


  const save = async () => {

    const date = new Date();
    const dateIsso = date.toISOString();
    const historico = [
      {
        date: dateIsso,
        // vendedor: session?.user?.name,
        msg: `Empresa ${nome} foi atualizado`,
      },
    ];


    const data = {
      data: {
        nome: nome,
        fantasia: fantasia,
        tipoPessoa: tipoPessoa,
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cep: cep,
        cidade: cidade,
        uf: uf,
        fone: fone,
        celular: celular,
        email: email,
        emailNfe: emailNfe,
        site: site,
        CNPJ: CNPJ,
        Ie: Ie,
        pais: pais,
        codpais: codpais,
        CNAE: CNAE,
        porte: porte,
        simples: simples,
        ieStatus: ieStatus,
        status: true,
        adFrailLat: adFrailLat,
        adFrailCab: adFrailCab,
        adEspecialLat: adEspecialLat,
        adEspecialCab: adEspecialCab,
        latFCab: latFCab,
        cabChao: cabChao,
        cabTop: cabTop,
        cxEco: cxEco,
        cxEst: cxEst,
        cxLev: cxLev,
        cxRef: cxRef,
        cxSupRef: cxSupRef,
        platSMed: platSMed,
        cxResi: cxResi,
        engEco: engEco,
        engLev: engLev,
        engRef: engRef,
        engResi: engResi,
        tablecalc: tablecalc,
        maxPg: maxPg,
        forpg: forpg,
        frete: frete,
        contribuinte: contribuinte,
        responsavel: Responsavel,
        history: historico,
      },
    };
    const reload = () => {
      setTimeout(() => {
        router.back();
      }, 500);
    };

    if (ID) {
      await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL + '/empresas/' + ID, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((response) => {
          console.log(response)
          toast({
            title: 'Cliente atualizado',
            status: 'success',
            duration: 9000,
            position: 'top-right',
          });
          setTimeout(() => router.push('/empresas'), 500)
        })
        .catch((err) => console.log(err));
    } else {
      await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL + '/empresas', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((response) => {
          console.log(response)
          toast({
            title: 'Cliente registrado',
            status: 'success',
            duration: 9000,
            position: 'top-right',
          });
          setTimeout(() => router.push('/empresas'), 500)
        })
        .catch((err) => console.log(err));
    }
  };


  function getResponsavel(respons: React.SetStateAction<string>) {
    setResponsavel(respons);
  }

  const maskCnpj = (e: any) => {
    const valor = e.target.value;
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ['99.999.999/9999-99']);
    setCNPJ(valorLinpo);
    setMaskCNPJ(masked);
  };

  const WhatsAppMask = (e: any) => {
    const valor = e.target.value;
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ['(99) 9 9999-9999']);
    setCelular(valorLinpo);
    setWhatsMask(masked);
  };

  setTimeout(() => {
    const maskedCnpj = mask(CNPJ, ['99.999.999/9999-99']);
    setMaskCNPJ(maskedCnpj);
    const maskedCel = mask(celular, ['(99) 9 9999-9999']);
    setWhatsMask(maskedCel);
  }, 50);

  return (
    <>
      <Box
        bg="#edf3f8"
        p={5}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box mt={[5, 0]}>
          <SimpleGrid
            display={{
              base: 'initial',
              md: 'grid',
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
              rounded={20}
              border={'1px solid #ccc'}
            >
              <chakra.form
                method="POST"
                shadow="base"
                rounded={[null, 20]}
                overflow={{
                  sm: 'hidden',
                }}
              >
                <Stack
                  px={4}
                  py={3}
                  bg="gray.50"
                  spacing={6}
                >
                  <SimpleGrid columns={12} spacing={3}>
                    <Heading as={GridItem} colSpan={12} size="md">
                      Cadastro de Empresa
                    </Heading>
                  </SimpleGrid>
                  <Flex>
                    <SimpleGrid columns={1} spacing={3}>
                      <Heading as={GridItem} colSpan={12} size="sd">
                        Dados da empresa
                      </Heading>
                      <FormControl as={GridItem} colSpan={[12, 5, null, 8]}>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="md"
                          color="gray.700"
                        >
                          Cnpj
                        </FormLabel>
                        <Input
                          type="text"
                          borderColor="gray.600"
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="xs"
                          w="full"
                          rounded="md"
                          onChange={maskCnpj}
                          value={MaskCNPJ}
                        />
                      </FormControl>
                      <Button
                        as={GridItem}
                        colSpan={[8, 4, null, 2]}
                        h={8}
                        mt={5}
                        colorScheme="messenger"
                        onClick={consulta}
                      >
                        Buscar dados
                      </Button>
                    </SimpleGrid>
                    <Box ms={20} mt={'auto'} hidden={!props.Data}>
                      <Text>Status</Text>
                    </Box>
                    <Box ms={5} mt={'auto'} hidden={!props.Data}>
                      <Switch
                        colorScheme="green"
                        borderColor="gray.900"
                        rounded="md"
                        isChecked={status}
                        onChange={(e) => setStatus(e.target.checked)}
                      />
                    </Box>
                  </Flex>

                  <SimpleGrid columns={9} spacing={3}>
                    <FormControl as={GridItem} colSpan={[5, 2]}>
                      <FormLabel
                        htmlFor="rozao"
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Razão social
                      </FormLabel>
                      <Input
                        type="text"
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        rounded="md"
                        onChange={(e) => setNome(e.target.value)}
                        value={nome}
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 2]}>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        E-mail
                      </FormLabel>
                      <Input
                        type="text"
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        rounded="md"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </FormControl>
                    <FormControl as={GridItem} colSpan={[6, 2]}>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        CNAE
                      </FormLabel>
                      <Input
                        type="text"
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        rounded="md"
                        onChange={(e) => setCNAE(e.target.value)}
                        value={CNAE}
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 1]}>
                      <FormLabel
                        htmlFor="ie"
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        IE
                      </FormLabel>
                      <Input
                        type="text"
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        rounded="md"
                        onChange={(e) => setIE(e.target.value)}
                        value={Ie}
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 1]}>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        IE Status
                      </FormLabel>
                      <Select
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        rounded="md"
                        value={(() => {
                          const val =
                            ieStatus === true && nome.length !== 0
                              ? 'sim'
                              : ieStatus === false && nome.length !== 0
                                ? 'não'
                                : ' ';
                          return val;
                        })()}
                      >
                        <option value=""></option>
                        <option value="sim">Sim</option>
                        <option value="não">Não</option>
                      </Select>
                    </FormControl>
                    <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                      <CompPessoa
                        Resp={Responsavel}
                        onAddResp={getResponsavel}
                      />
                    </FormControl>
                  </SimpleGrid>

                  <SimpleGrid columns={12} spacing={3}>
                    <FormControl as={GridItem} colSpan={[6, 2]}>
                      <FormLabel
                        htmlFor="pais"
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        País
                      </FormLabel>
                      <Input
                        type="text"
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        rounded="md"
                        onChange={(e) => setPais(e.target.value)}
                        value={pais}
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 2, 1]}>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Cod.País
                      </FormLabel>
                      <Input
                        type="text"
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        rounded="md"
                        onChange={(e) => setCodpais(e.target.value)}
                        value={codpais}
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 3]}>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Endereço ou Logradouro
                      </FormLabel>
                      <Input
                        type="text"
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        rounded="md"
                        onChange={(e) => setEndereco(e.target.value)}
                        value={endereco}
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 1]}>
                      <FormLabel
                        htmlFor="numero"
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        N°
                      </FormLabel>
                      <Input
                        type="text"
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        rounded="md"
                        onChange={(e) => setNumero(e.target.value)}
                        value={numero}
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 2]}>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
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
                        onChange={(e) => setComplemento(e.target.value)}
                        value={complemento}
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 3, null, 3]}>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
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
                        onChange={(e) => setBairro(e.target.value)}
                        value={bairro}
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 3, null, 1]}>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Cep
                      </FormLabel>
                      <Input
                        type="text"
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        rounded="md"
                        onChange={(e) => setCep(e.target.value)}
                        value={cep}
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
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
                        onChange={(e) => setCidade(e.target.value)}
                        value={cidade}
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[3, null, 1]}>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Uf
                      </FormLabel>
                      <Input
                        type="text"
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        rounded="md"
                        onChange={(e) => setUf(e.target.value)}
                        value={uf}
                      />
                    </FormControl>
                    <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Site
                      </FormLabel>
                      <Input
                        type="text"
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        rounded="md"
                        onChange={(e) => setSite(e.target.value)}
                        value={site}
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        E-mail para envio de Nfe
                      </FormLabel>
                      <Input
                        type="text"
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        rounded="md"
                        onChange={(e) => setEmailNfe(e.target.value)}
                        value={emailNfe}
                      />
                    </FormControl>
                    <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                      <FormLabel
                        htmlFor="cidade"
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Whatsapp
                      </FormLabel>
                      <Input
                        type="text"
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        rounded="md"
                        onChange={WhatsAppMask}
                        value={WhatsMask}
                      />
                    </FormControl>
                    <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Contribuinte
                      </FormLabel>
                      <Select
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        fontSize="xs"
                        rounded="md"
                        placeholder="Selecine uma opção"
                        onChange={(e) => setContribuinte(e.target.value)}
                        value={contribuinte}
                      >
                        <option value="1">Contribuinte ICMS</option>
                        <option value="2">Contribuinte isento do ICMS</option>
                        <option value="9">Não contribuinte</option>
                      </Select>
                    </FormControl>
                  </SimpleGrid>
                </Stack>
                <Stack
                  px={4}
                  py={3}
                  bg="gray.50"
                  _dark={{
                    bg: '#141517',
                  }}
                  spacing={6}
                >
                  <SimpleGrid columns={12} spacing={3}>
                    <Heading as={GridItem} colSpan={12} size="sd">
                      Configurações da Empresa
                    </Heading>

                    <FormControl as={GridItem} colSpan={[6, 3]}>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Tabela de cálculo
                      </FormLabel>
                      <Select
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        fontSize="xs"
                        rounded="md"
                        placeholder="Selecione uma opção"
                        onChange={(e) => setTablecalc(e.target.value)}
                        value={tablecalc}
                      >
                        <option value=""></option>
                        <option value="0.30">Balcão</option>
                        <option value="0.26">Vip</option>
                        <option value="0.23">Bronze</option>
                        <option value="0.20">Prata</option>
                        <option value="0.17">Ouro</option>
                        <option value="0.14">Platinum</option>
                      </Select>
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 3]}>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Máximo prazo p/ pagamento:
                      </FormLabel>
                      <Select
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        fontSize="xs"
                        rounded="md"
                        placeholder="Selecione uma tabela"
                        onChange={(e) => setMaxpg(e.target.value)}
                        value={maxPg}
                      >
                        <option value="0">À vista (antecipado)</option>
                        <option value="5">5 dias</option>
                        <option value="15">15 dias</option>
                        <option value="28">28 dias</option>
                        <option value="35">28 e 35 dias</option>
                        <option value="42">28, 35 e 42 dias</option>
                        <option value="90">
                          90 dias (Casos muito excepcionais)
                        </option>
                      </Select>
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 3]}>
                      <FormLabel
                        htmlFor="pagamento"
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Preferência de pagamento:
                      </FormLabel>
                      <Select
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        fontSize="xs"
                        rounded="md"
                        placeholder="Escolha uma opção"
                        onChange={(e) => setForpg(e.target.value)}
                        value={forpg}
                      >
                        <option value="desconto">Desconto À VISTA</option>
                        <option value="prazo">
                          Maior prazo para pagamento
                        </option>
                      </Select>
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 3]}>
                      <FormLabel
                        htmlFor="frete"
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Frete
                      </FormLabel>
                      <Select
                        name="frete"
                        id="frete"
                        borderColor="gray.600"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="xs"
                        w="full"
                        fontSize="xs"
                        rounded="md"
                        placeholder="Escolha uma opção"
                        onChange={(e) => setFrete(e.target.value)}
                        value={frete}
                      >
                        <option value="FOB">FOB - Por conta do cliente</option>
                        <option value="CIF">CIF - Por conta da Ribermax</option>
                      </Select>
                    </FormControl>
                  </SimpleGrid>

                  <SimpleGrid columns={12} spacing={5}>
                    <Heading as={GridItem} colSpan={12} mb={3} size="sd">
                      Configurações de Embalagens
                    </Heading>
                    {confgEnb.map((item) => {
                      const val =
                        item.id === '12'
                          ? adFrailLat
                          : item.id === '13'
                            ? adFrailCab
                            : item.id === '14'
                              ? adEspecialLat
                              : item.id === '15'
                                ? adEspecialCab
                                : item.id === '16'
                                  ? latFCab
                                  : item.id === '17'
                                    ? cabChao
                                    : cabTop;

                      return (
                        <Box
                          key={item.id}
                          as={GridItem}
                          colSpan={[6, 3, null, 2]}
                        >
                          <Flex>
                            <Flex alignItems="center" h={5}>
                              <Switch
                                colorScheme="green"
                                borderColor="gray.900"
                                rounded="md"
                                isChecked={val}
                                onChange={(e) => {
                                  const set =
                                    item.id === '12'
                                      ? setAdFragilLat(e.target.checked)
                                      : item.id === '13'
                                        ? setAdFragilCab(e.target.checked)
                                        : item.id === '14'
                                          ? setAdEspecialLat(e.target.checked)
                                          : item.id === '15'
                                            ? setAdEspecialCab(e.target.checked)
                                            : item.id === '16'
                                              ? setLatFCab(e.target.checked)
                                              : item.id === '17'
                                                ? setCabChao(e.target.checked)
                                                : setCabTop(e.target.checked);
                                  return set;
                                }}
                              />
                            </Flex>
                            <Box ml={3}>
                              <chakra.label
                                fontWeight="md"
                                color="gray.700"
                              >
                                {item.title}
                              </chakra.label>
                            </Box>
                          </Flex>
                        </Box>
                      );
                    })}
                  </SimpleGrid>

                  <SimpleGrid columns={12} spacing={5}>
                    <Heading as={GridItem} colSpan={12} mb={5} size="sd">
                      Modelos de Caixas
                    </Heading>
                    {modCaix.map((item) => {
                      const val =
                        item.id === '1'
                          ? cxEco
                          : item.id === '2'
                            ? cxEst
                            : item.id === '3'
                              ? cxLev
                              : item.id === '4'
                                ? cxRef
                                : item.id === '5'
                                  ? cxSupRef
                                  : item.id === '6'
                                    ? platSMed
                                    : item.id === '7'
                                      ? cxResi
                                      : item.id === '8'
                                        ? engEco
                                        : item.id === '9'
                                          ? engLev
                                          : item.id === '10'
                                            ? engRef
                                            : engResi;
                      return (
                        <Box
                          key={item.id}
                          as={GridItem}
                          colSpan={[6, 3, null, 2]}
                        >
                          <Flex>
                            <Flex alignItems="center" h={5}>
                              <Switch
                                colorScheme="green"
                                borderColor="gray.400"
                                rounded="md"
                                isChecked={val}
                                onChange={(e) => {
                                  const set =
                                    item.id === '1'
                                      ? setCxEco(e.target.checked)
                                      : item.id === '2'
                                        ? setCxEst(e.target.checked)
                                        : item.id === '3'
                                          ? setCxLev(e.target.checked)
                                          : item.id === '4'
                                            ? setCxRef(e.target.checked)
                                            : item.id === '5'
                                              ? setCxSupRef(e.target.checked)
                                              : item.id === '6'
                                                ? setPlatSMed(e.target.checked)
                                                : item.id === '7'
                                                  ? setCxResi(e.target.checked)
                                                  : item.id === '8'
                                                    ? setEngEco(e.target.checked)
                                                    : item.id === '9'
                                                      ? setEngLev(e.target.checked)
                                                      : item.id === '10'
                                                        ? setEngRef(e.target.checked)
                                                        : setEngResi(e.target.checked);
                                  return set;
                                }}
                              />
                            </Flex>

                            <Box ml={3}>
                              <chakra.label
                                fontWeight="md"
                                color="gray.700"
                              >
                                {item.title}
                              </chakra.label>
                            </Box>
                          </Flex>
                        </Box>
                      );
                    })}
                  </SimpleGrid>
                </Stack>
                <Box
                  px={{
                    base: 4,
                    sm: 6,
                  }}
                  py={2}
                  pb={[12, null, 5]}
                  bg="gray.50"
                  _dark={{
                    bg: '#121212',
                  }}
                  textAlign="right"
                >
                  <Button
                    colorScheme="red"
                    me={5}
                    _focus={{
                      shadow: '',
                    }}
                    fontWeight="md"
                    onClick={() => router.push('/empresas/')}
                  >
                    Cancelar
                  </Button>
                  <Button
                    colorScheme="whatsapp"
                    _focus={{
                      shadow: '',
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
    </>
  )
}