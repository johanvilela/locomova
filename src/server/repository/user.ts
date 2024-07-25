import { hashSync } from "bcryptjs";

import { supabase } from "@server/infra/db/supabase";
import { CreateNewUserParams, UserSchema } from "@server/schema/user";

async function createNewUser({ username, password }: CreateNewUserParams) {
  // Encrypt password
  const saltRounds = 10;
  const hash = hashSync(password, saltRounds);

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        username,
        password: hash,
      },
    ])
    .select()
    .single();
  if (error) throw new Error("Failed to create user");
  // TODO: Detail error when username already exists

  const parsedUser = UserSchema.parse(data);

  return { id: parsedUser.id };
}

export const userRepository = {
  createNewUser,
};
