import { vehicleController } from "@server/controller/vehicle";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "PUT") {
    await vehicleController.updateById(request, response);
    return;
  }

  if (request.method === "DELETE") {
    await vehicleController.deleteById(request, response);
    return;
  }

  response.status(405).json({
    error: {
      message: "Method not allowed",
    },
  });
}
