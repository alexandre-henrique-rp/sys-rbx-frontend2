export const dbPost = async (data: any) => {
  const url = process.env.NEXT_PUBLIC_STRAPI_API_URL + '/empresas';
  const token = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

  await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((json) => {
      return 'Cliente salvar corretamente no Banco de dados,'+ json.data;
    })
    .catch((err) => {
      return 'Erro em salvar cliente no Banco de dados'+ err;
    });
}