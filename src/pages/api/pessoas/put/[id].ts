import { NextApiRequest, NextApiResponse } from "next";
import { dbPut } from "./request/db";

export default async function GetEmpresa(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const bodyData = req.body;
    const id: any = req.query.id;

    if (!bodyData) {
      return res
        .status(401)
        .send("Essa requisição não tem informação para serem gravadas");
    }
    if (!id || id === undefined || id == null || id == "") {
      return res.status(401).send("id não foi informado");
    } else {
      const db = await dbPut(bodyData, id);
      return res.status(201).send({ message1: db});
    }
  } else {
    return res.status(405).send({ message: "Only PUT requests are allowed" });
  }
}
