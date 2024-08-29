import { verifyToken } from "@server/utils/jwt";
import { userController } from "@server/controller/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    await verifyToken(request)
      .then(async () => {
        await userController.create(request, response);
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
