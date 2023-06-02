import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetEmpresa(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/pedidos?populate=*&filters[businessId][$eq]=${id}`,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        "Content-Type": "application/json"
      }
    })
      .then(async (Response) => {
        res.status(200).json(Response.data.data);
      })
      .catch((err) => {
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
