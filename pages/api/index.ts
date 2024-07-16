import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.status(200).json({ message: "Essa é a API do Locomova!" });
}
