import { PostErroPHP } from "./lid/erroPhp";
import { GetLoteProposta } from "./lid/getLote";


export const LoteRibermax = async (numero: any) => {
  const items = await GetLoteProposta(numero);

  const TokenRibermax: any = process.env.ATORIZZATION_TOKEN_RIBERMAX;
  const EmailRibermax: any = process.env.ATORIZZATION_EMAIL

  const promessas = [];

  for (const i of items) {
    const formData = new FormData();
    formData.append("cliente[CNPJ]", i.attributes.CNPJClinet);
    formData.append("emitente[CNPJ]", i.attributes.CNPJEmitente);
    formData.append("idProduto", i.attributes.produtosId);
    formData.append("nLote", i.attributes.lote);
    formData.append("qtde", i.attributes.qtde);

    const promessa = await fetch(
      `${process.env.RIBERMAX_API_URL}/lotes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: TokenRibermax,
          Email: EmailRibermax,
        }
      }
    )
      .then((res) => res.json())
      .then(async (response) => {
        return {
          msg: await response.data.message,
          lote: await response.data.lote.lote
        };
      })
      .catch(async (error) => {
        const data = {
          log: {
            "cliente[CNPJ]": i.attributes.CNPJClinet,
            "emitente[CNPJ]": i.attributes.CNPJEmitente,
            idProduto: i.attributes.produtosId,
            nLote: i.attributes.lote,
            qtde: i.attributes.qtde,
            pedido: numero,
            error: error.response.data
          }
        };
        return await PostErroPHP(data);
      });

    promessas.push(promessa);
  }

  const resposta = await Promise.all(promessas);
  console.log(resposta);
  return resposta;
};





