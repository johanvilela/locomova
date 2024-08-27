import { z as schema } from "zod";

export const LoginInputsSchema = schema.object({
  username: schema
    .string({ required_error: "Insira o usuário" })
    .trim()
    .min(1, {
      message: "Insira o usuário",
    }),
  password: schema.string({ required_error: "Insira a senha" }).trim().min(1, {
    message: "Insira a senha",
  }),
});

export type LoginInputs = schema.infer<typeof LoginInputsSchema>;
