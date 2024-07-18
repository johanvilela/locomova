import { z as schema } from "zod";

export const VehicleSchema = schema.object({
  id: schema.string().uuid(),
  created_at: schema.string().transform((date) => {
    return new Date(date).toISOString();
  }),
  name: schema.string().min(1),
  manufacturer: schema.string().min(1),
  model: schema.string().min(1),
  price: schema.number(),
  image_path: schema.string().min(1),
});

export type Vehicle = schema.infer<typeof VehicleSchema>;

export const CreateVehicleBodySchema = schema.object({
  name: schema.string().min(1),
  manufacturer: schema.string().min(1),
  model: schema.string().min(1),
  price: schema.number(),
  image_path: schema.string().min(1),
});

export type CreateNewVehicleParams = schema.infer<
  typeof CreateVehicleBodySchema
>;

export const GetVehiclesQuerySchema = schema.object({
  page: schema
    .string({
      required_error: "Required URL Search Param: `page`",
    })
    .min(1)
    .transform((page) => Number(page)),
  limit: schema
    .string({
      required_error: "Required URL Search Param: `limit`",
    })
    .min(1)
    .transform((page) => Number(page)),
});

export const UpdateVehicleQuerySchema = schema.object({
  id: schema.string().uuid().min(1),
});

export const UpdateVehicleBodySchema = schema.object({
  name: schema.string().min(1),
  manufacturer: schema.string().min(1),
  model: schema.string().min(1),
  price: schema.number(),
  image_path: schema.string().min(1),
});

export type UpdateVehicleParams = schema.infer<typeof UpdateVehicleBodySchema>;

export const DeleteVehicleQuerySchema = schema.object({
  id: schema.string().uuid().min(1),
});
