import { z as schema } from "zod";

export const VehicleSchema = schema.object({
  id: schema.string().uuid(),
  created_at: schema.string().datetime(),
  name: schema.string().min(1),
  manufacturer: schema.string().min(1),
  model: schema.string().min(1),
  price: schema.number(),
  image_path: schema.string().min(1),
});

export type Vehicle = schema.infer<typeof VehicleSchema>;
