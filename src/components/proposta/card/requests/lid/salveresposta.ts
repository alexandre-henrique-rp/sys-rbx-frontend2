export const SaveResponse = async (
  nPedido: string,
  Bpedido: string,
  Idnegocio: string
) => {
  const dataDbPedido = {
    data: {
      Bpedido: Bpedido.toString(),
      stausPedido: true
    }
  };

  try {
    const token = process.env.ATORIZZATION_TOKEN;
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(dataDbPedido)
    };
    const response1 = await fetch(`${baseURL}/pedidos/` + nPedido, requestOptions);
    const responseData1 = await response1.json();
    console.log(responseData1);

    const response2 = await fetch(`${baseURL}/businesses/` + Idnegocio, requestOptions);
    const responseData2 = await response2.json();
    console.log(responseData2);
  } catch (error: any) {
    console.log(error.response.data.error);
  }
};
