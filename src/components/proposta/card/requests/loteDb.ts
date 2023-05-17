const GetLotsTotal = async () => {
  const respose = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/lotes?fields[0]=lote&sort=lote%3Adesc&pagination[limit]=1`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
      }
    }
  );
  const data = await respose.json();
  const [NLote]: any = data.data;
  const NloteEnvi: any = process.env.LOTE_INICIAL;

  try {

    if (!NloteEnvi && !NLote) {
      throw {
        response: {
          status: 404,
        },
        message: "Erro ao gerar numero de lote",
        erro: "Não foi possivel gera o numero de lote",
        detalhes:
          "O numero de lote inicial Não foi encontardo e o retorno do Database foi null",
      };
    }

    if (!NLote) {
      const ALote = parseInt(NloteEnvi) + 1;
      return ALote;
    }

    if (
      NLote.attributes.lote === "" ||
      NLote.attributes.lote === null ||
      NLote.attributes.lote === undefined
    ) {
      const ALote = parseInt(NloteEnvi) + 1;
      return ALote;
    }

    const AnLote = parseInt(NLote.attributes.lote) + 1;
    return AnLote;
    
  } catch (error: any) {
    console.log(error);
    const status = error.response?.status || 500;
    const message = error.message || "Erro do Servidor Interno";
    const errorResponse = {
      message,
      status,
      erro: error.erro || "[]",
      detalhes: error.detalhes || "null",
    };
    throw errorResponse;
  }
};


export const LoteDb = async (numero: any) => {
  const ResposePedido = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/pedidos?populate=*&filters[nPedido][$eq]=${numero}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
      }
    }
  )
  const dataPedido = await ResposePedido.json()
  const [pedido] =  dataPedido.data

  const items = pedido.attributes.itens;
  const empresa = pedido.attributes.empresaId;
  const empresaCNPJ = pedido.attributes.empresa.data.attributes.CNPJ;
  const negocio = pedido.attributes.business.data.id;
  const fornecedor = pedido.attributes.fornecedorId;
  const fornecedorCNPJ = pedido.attributes.fornecedorId.data.attributes.CNPJ;
  const vendedor = pedido.attributes.user.data.id;

  try {
    const result = [];

    for (const i of items) {
      const NLote = await GetLotsTotal();
      const postLote = {
        data: {
          lote: NLote,
          empresa: empresa,
          empresaId: empresa,
          business: negocio,
          produtosId: i.prodId,
          emitente: fornecedor.data.attributes.titulo,
          emitenteId: fornecedor.data.id,
          qtde: i.Qtd,
          info: "",
          status: "",
          checklist: "",
          logs: "",
          vendedor: vendedor,
          nProposta: numero,
          CNPJClinet: empresaCNPJ,
          CNPJEmitente: fornecedorCNPJ
        },
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/pedidos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
          },
          body: JSON.stringify(postLote)
        }
      );
      const resultado = await res.json()
      result.push(resultado.data);
    }

    return result;

  } catch (error) {
    console.log(error);
    return error;
  }
};
