import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticationBodySchema } from "@server/schema/authentication";
import { authenticationRepository } from "@server/repository/authentication";

async function authenticate(req: NextApiRequest, res: NextApiResponse) {
  const parsedBody = AuthenticationBodySchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({
      error: {
        message: "Invalid body data format",
        description: parsedBody.error.issues,
      },
    });
    return;
  }
  const userData = parsedBody.data;

  try {
    const authenticationData = await authenticationRepository.authenticate(
      userData
    );
    res.status(200).json({
      access_token: authenticationData.accessToken,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Failed to authenticate user",
      },
    });
  }
}

export const authenticationController = {
  authenticate,
};
