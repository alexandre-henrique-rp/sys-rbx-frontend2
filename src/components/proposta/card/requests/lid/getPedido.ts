export const GetPedido = async(numero: any) => {
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
  return  dataPedido.data
}