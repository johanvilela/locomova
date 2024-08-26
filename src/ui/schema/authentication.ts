import { z as schema } from "zod";

export const AuthCredentialSchema = schema.object({
  username: schema.string().min(1),
  password: schema.string().min(1),
});

export type AuthCredential = schema.infer<typeof AuthCredentialSchema>;

export const AuthRepositoryAuthenticateOutputSchema = schema.object({
  access_token: schema.string().min(1),
});

export type AuthRepositoryAuthenticateOutput = schema.infer<
  typeof AuthRepositoryAuthenticateOutputSchema
>;
