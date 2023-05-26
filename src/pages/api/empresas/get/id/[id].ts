import { NextApiRequest, NextApiResponse } from "next";

export default async function GetEmpresa(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL + `/empresas/${id}?&populate=*`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )
      .then((resp) => resp.json())
      .then((Response: any) => {
        res.status(200).json(Response.data);
        console.log("🚀 ~ file: [id].ts:22 ~ .then ~ Response.data:", Response.data)
      })
      .catch((err: any) => {
        console.log("🚀 ~ file: [id].ts:25 ~ err:", err)
        res.status(400).json({
          error: err.response.data,
          mensage: err.response.data.error,
          detalhe: err.response.data.error.details
        });
      });
  } else {
    return res.status(405).send({ message: "Only GET requests are allowed" });
  }
}