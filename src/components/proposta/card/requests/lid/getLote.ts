export const GetLoteProposta = async (npedido: string) => {
  const respose = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/lotes?populate=*&filters[nProposta][$eq]=${npedido}&sort[0]=id%3Adesc`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
      }
    }
  );
  const data = await respose.json();
  return data.data;
}