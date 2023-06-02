import { NextApiRequest, NextApiResponse } from "next";

export default async function postPedido(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
   
  } else {
    return res.status(405).send({ message: "Only POST requests are allowed" });
  }
}
