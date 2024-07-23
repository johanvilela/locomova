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

export const NewVehicleSchema = VehicleSchema.pick({
  name: true,
  manufacturer: true,
  model: true,
  price: true,
});

export type NewVehicle = schema.infer<typeof NewVehicleSchema>;

export const NewVehicleFormSchema = schema.object({
  name: schema.string().trim().min(1, { message: "Insira o nome do veículo" }),
  manufacturer: schema
    .string()
    .trim()
    .min(1, { message: "Insira a montadora do veículo" }),
  model: schema
    .string()
    .trim()
    .min(1, { message: "Insira o modelo do veículo" }),
  price: schema
    .string()
    .trim()
    .min(1, { message: "Insira o preço do veículo" })
    .transform((priceString) => {
      return Number(priceString);
    }),
});

export type NewVehicleFormInputs = schema.infer<typeof NewVehicleFormSchema>;