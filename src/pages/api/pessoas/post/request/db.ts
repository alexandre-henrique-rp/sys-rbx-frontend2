import axios from "axios";

export const dbPost = async (data: any) => {
  const url = process.env.NEXT_PUBLIC_STRAPI_API_URL + '/pessoas';
  const token = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

  await axios({
    method: 'POST',
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: data,
  })
    .then((json) => {
      return 'Cliente salvar corretamente no Banco de dados,'+ json.data;
    })
    .catch((err) => {
      return 'Erro em salvar cliente no Banco de dados'+ err;
    });
}