import { z as schema } from "zod";

export const UserSchema = schema.object({
  id: schema.string().uuid(),
  created_at: schema.string().transform((date) => {
    return new Date(date).toISOString();
  }),
  username: schema.string().min(1),
  password: schema.string().min(1),
});

export type User = schema.infer<typeof UserSchema>;

export const CreateUserBodySchema = schema.object({
  username: schema.string().min(1),
  password: schema.string().min(1),
});

export type CreateNewUserParams = schema.infer<typeof CreateUserBodySchema>;
