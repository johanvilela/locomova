import {
  AuthCredential,
  AuthCredentialSchema,
} from "@ui/schema/authentication";
import { authRepository } from "../repository/authentication";

interface AuthControllerAuthenticateParams {
  credential: AuthCredential;
}
async function authenticate({ credential }: AuthControllerAuthenticateParams) {
  const parsedData = AuthCredentialSchema.safeParse(credential);
  if (!parsedData.success) {
    throw new Error("Invalid Authentication Credential");
  }

  const parsedCredential = parsedData.data;

  return await authRepository.authenticate(parsedCredential);
}

export const authController = {
  authenticate,
};
