/* eslint-disable no-undef */
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetEmpresa(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

    await axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_STRAPI_API_URL + "/b-tatendimentos",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((resp: any) => {
        res.status(200).json(resp.data.data);
      })
      .catch((err) => {
        res.status(400).send(err.response.data.error.message);
        console.log("🚀 ~ file: index.ts:26 ~ err.response.data.error.message:", err.response.data.error.message)
      });
  } else {
    return res.status(405).send({ message: "Only GET requests are allowed" });
  }
}
