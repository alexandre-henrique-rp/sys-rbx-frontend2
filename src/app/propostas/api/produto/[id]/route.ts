import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params
  }: {
    params: { id: string };
  }
) {
  try {
    const ID = params.id;

    const request = await fetch(
      `${process.env.RIBERMAX_PHP_API_URL}/produtos?prodId=${ID}`,
      {
        method: "GET",
        headers: {
          Email: `${process.env.ATORIZZATION_EMAIL}`,
          Token: `${process.env.ATORIZZATION_TOKEN_RIBERMAX}`
        }
      }
    );
    const produtos = await request.json();
    console.log("🚀 ~ file: route.ts:25 ~ produtos:", produtos)

    return NextResponse.json(produtos);
  } catch (error) {
    return NextResponse.json(error);
  }
}