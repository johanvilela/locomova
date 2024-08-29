import * as jose from "jose";
import { NextApiRequest } from "next";

export async function generateAccessToken(username: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  const jwt = await new jose.SignJWT({ username: username })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);

  return jwt;
}

export async function verifyToken(request: NextApiRequest) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new Error("Missing `Authorization` request header");
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = authorization.split(" ")[1];

  try {
    await jose.jwtVerify(jwt, secret);
  } catch (error) {
    throw new Error("Unauthorized user");
  }
}
