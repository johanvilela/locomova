import { AuthenticateParams } from "@server/schema/authentication";
import { supabase } from "../infra/db/supabase";
import { compareSync } from "bcryptjs";
import * as jose from "jose";

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

async function generateAccessToken(username: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  const jwt = await new jose.SignJWT({ username: username })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);

  return jwt;
}
