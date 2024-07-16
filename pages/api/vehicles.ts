import { vehicleController } from "@server/controller/vehicle";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    await vehicleController.get(request, response);
    return;
  }

  if (request.method === "POST") {
    response.status(200).json({
      message: "POST vehicles",
    });
    return;
  }

  response.status(405).json({
    error: {
      message: "Method not allowed",
    },
  });
}
