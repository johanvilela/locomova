import { NextApiRequest, NextApiResponse } from "next";
import { CreateUserBodySchema } from "@server/schema/user";
import { userRepository } from "@server/repository/user";

async function create(req: NextApiRequest, res: NextApiResponse) {
  const parsedBody = CreateUserBodySchema.safeParse(req.body);
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
    const createdUser = await userRepository.createNewUser(userData);

    res.status(201).json({
      user_id: createdUser.id,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Failed to create user",
      },
    });
  }
}

export const userController = {
  create,
};
