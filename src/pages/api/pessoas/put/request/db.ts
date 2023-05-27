import axios from "axios";

export const dbPut = async (data: any, id: any) => {
  const url =  process.env.NEXT_PUBLIC_STRAPI_API_URL + '/pessoas/'+ id;
  const token = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

  await axios({
    method: 'PUT',
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: data,
  })
    .then((json) => {
      return 'Cliente atualizado corretamente no Banco de dados,'+ json.data;
    })
    .catch((err) => {
      console.log(err);
      return 'Erro em atualizar cliente no Banco de dados'+ err;
    });
}