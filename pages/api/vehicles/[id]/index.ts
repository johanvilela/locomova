import { verifyToken } from "@server/utils/jwt";
import { vehicleController } from "@server/controller/vehicle";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "PUT") {
    await verifyToken(request)
      .then(async () => {
        await vehicleController.updateById(request, response);
      })
      .catch(() => {
        return response.status(401).json({
          error: {
            message: "Unauthorized user",
          },
        });
      });
    return;
  }

  if (request.method === "DELETE") {
    await verifyToken(request)
      .then(async () => {
        await vehicleController.deleteById(request, response);
      })
      .catch(() => {
        return response.status(401).json({
          error: {
            message: "Unauthorized user",
          },
        });
      });
    return;
  }

  response.status(405).json({
    error: {
      message: "Method not allowed",
    },
  });
}
