import { z as schema } from "zod";

export const VehicleSchema = schema.object({
  id: schema.string().uuid(),
  created_at: schema.string().transform((date) => {
    return new Date(date).toISOString();
  }),
  name: schema.string().min(1),
  manufacturer: schema.string().min(1),
  model: schema.string().min(1),
});

export type Vehicle = schema.infer<typeof VehicleSchema>;

// // Model/Schema
// interface Vehicle {
//   id: string;
//   created_at: string;
//   name: string;
//   manufacturer: string;
//   model: string;
// }

export const VehicleCreateBodySchema = schema.object({
  name: schema.string().min(1),
  manufacturer: schema.string().min(1),
  model: schema.string().min(1),
});
