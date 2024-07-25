import { z as schema } from "zod";

export const AuthenticationBodySchema = schema.object({
  username: schema.string().min(1),
  password: schema.string().min(1),
});

export type AuthenticateParams = schema.infer<typeof AuthenticationBodySchema>;
