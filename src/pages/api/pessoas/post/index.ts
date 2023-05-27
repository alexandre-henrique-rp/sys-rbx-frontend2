import { NextApiRequest, NextApiResponse } from 'next';
import { dbPost } from './request/db';


export default async function GetEmpresa(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const bodyData = req.body;

      const db = await dbPost(bodyData)

      return res.status(201).send({ message1: db});
  } else {
    return res.status(405).send({ message: 'Only POST requests are allowed' });
  }
}
