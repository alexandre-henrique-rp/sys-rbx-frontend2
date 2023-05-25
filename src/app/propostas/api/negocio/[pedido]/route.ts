import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params
  }: {
    params: { pedido: string };
  }
) {
  try {
    const pedido = params.pedido;

    const request = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL +
      `/pedidos?populate=*&filters[nPedido][$eq]=${pedido}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
      }
    })
    const response = await request.json()    

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(error);
  }
}