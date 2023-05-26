import axios from "axios";

export const phpPut = async (data: any, apiEmail: any) => {
  const email = apiEmail
  await axios({
    method: "PUT",
    url: process.env.RIBERMAX_PHP_API_URL + "/empresas",
    headers: {
      Email: email,
      Token: process.env.ATORIZZATION_TOKEN_RIBERMAX,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: new URLSearchParams(data).toString(),
  })
    .then((response) => {
      return 'Cliente atualizado corretamente no Banco de dados PHP'+ response.data;
    })
    .catch((error) => {
      return 'Erro em atualizar cliente no Banco de dados'+ error;
    });
}