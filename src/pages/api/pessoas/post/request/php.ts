import axios from "axios";

export const phpPost = async (data: any, apiEmail: any) => {
  const email = apiEmail
  await axios({
    method: "POST",
    url: process.env.RIBERMAX_API_URL + "/empresas",
    headers: {
      Email: email,
      Token: process.env.ATORIZZATION_TOKEN_RIBERMAX,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: new URLSearchParams(data).toString(),
  })
    .then((response) => {
      return 'Cliente salvo corretamente no Banco de dados PHP'+ response.data;
    })
    .catch((error) => {
      return 'Erro em salvar cliente no Banco de dados'+ error;
    });
}