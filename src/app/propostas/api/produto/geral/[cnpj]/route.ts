import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params
  }: {
    params: { cnpj: string };
  }
) {
  const cnpj = params.cnpj;

  const requ = await fetch(
    `${process.env.RIBERMAX_PHP_API_URL}/produtos?CNPJ=${cnpj}`,
    {
      method: "GET",
      headers: {
        Email: `${process.env.ATORIZZATION_EMAIL}`,
        Token: `${process.env.ATORIZZATION_TOKEN_RIBERMAX}`
      }
    }
  );
  const produtos = await requ.json();

  return NextResponse.json(produtos);
}
