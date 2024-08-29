import { AuthenticateParams } from "@server/schema/authentication";
import { supabase } from "../infra/db/supabase";
import { compareSync } from "bcryptjs";
import { generateAccessToken } from "@server/utils/jwt";

async function authenticate({ username, password }: AuthenticateParams) {
  const { data, error } = await supabase
    .from("users")
    .select("password")
    .eq("username", username)
    .single();
  if (error) throw new Error("Failed to get hash by username");

  const hash = data.password;

  const isPasswordCorrect = compareSync(password, hash);
  if (!isPasswordCorrect) throw new Error("Failed to authenticate");

  const jwt = await generateAccessToken(username);

  return { accessToken: jwt };
}
export const authenticationRepository = {
  authenticate,
};
