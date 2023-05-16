export const ExcluirNegocio = async (id: string) => {
  const data = {
    data: {
      status: false
    }
  };

  const response = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API_URL + '/businesses/' + id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
      },
      body: JSON.stringify(data)
    }
  );
  const dataResp = await response.json();
  return dataResp.data;
};
