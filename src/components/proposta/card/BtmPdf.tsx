import React, { useEffect, useState, memo, useMemo } from "react";
import { Button } from "@chakra-ui/react";
import PdfPedido2 from "../pdf";
import pdfMake from "pdfmake/build/pdfmake";
import { BufferOptions, TDocumentDefinitions } from "pdfmake/interfaces";


const BTMPdf = (props: { nPedido: any; empresa: string }) => {
  const [dados, setDados] = useState<any>([]);

  const GetDados = async (MPedido: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/pedidos?populate=*&filters[nPedido][$eq]=${MPedido}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
      },
    });
    const result = await response.json();
    const inf = result?.data?.[0]?.attributes;
    const Vendedor = inf.user.data.attributes.username;
    const empresaFornec = inf.fornecedorId.data.attributes;

    const getLogo = await fetch(`/logo/${empresaFornec.nome}`)
    const Responselogo = await getLogo.json();
    const logo = Responselogo.logo;

    const dadosFornecedor = {
      data: {
        razao: empresaFornec?.nome,
        fantasia: empresaFornec?.fantasia,
        cnpj: empresaFornec?.CNPJ.replace(
          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
          "$1.$2.$3/$4-$5"
        ),
        endereco: empresaFornec?.endereco + ", " + empresaFornec?.numero,
        cidade: "Riberão Preto",
        uf: "SP",
        tel: "(16) 9 9765-5543",
        email: empresaFornec?.email,
      },
    };

    const nPedido = inf.nPedido;
    const frete = inf.frete;
    const datePop = inf.dataPedido;
    const fornecedor = dadosFornecedor;
    const cliente = inf.empresa.data.attributes;
    const condi = inf.condi;
    const itens = inf.itens.map((i: any) => (
      {
        ...i,
        totalPrint: parseFloat(i.total).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL"
        }),
        precoPrint: parseFloat(i.vFinal.replace(/','+/g, ".")).toLocaleString(
          "pt-br",
          { style: "currency", currency: "BRL" }
        )
      }));

    const prazo = inf.prazo === null ? "" : inf.prazo;
    const venc = inf.vencPrint;
    const totoalGeral = inf.totalGeral;
    const obs = inf.obs === null ? "" : inf.obs;
    const business = !inf.business.data
      ? ""
      : inf.business.data.id === null
        ? ""
        : inf.business.data.id;

    const cliente_pedido = inf.cliente_pedido;

    const data = {
      nPedido,
      frete,
      datePop,
      fornecedor,
      cliente,
      itens,
      condi,
      prazo,
      venc,
      totoalGeral,
      obs,
      business,
      Vendedor,
      cliente_pedido,
      logo
    };
    setDados(data);
  }

  const Handleprint = () => {
    const codePdf = PdfPedido2(dados)
    const newWindow = window.open('', '_blank');
    return pdfMake.createPdf(codePdf).open({}, newWindow);
  }


  useMemo(() => {
    GetDados(props.nPedido)
  }, [props.nPedido])
  return (
    <>
     
      <Button p={3} fontSize={'0.9rem'} colorScheme={"whatsapp"}
        onClick={Handleprint}>
        Gerar PDF
      </Button>
    </>
  );
};

export default memo(BTMPdf)