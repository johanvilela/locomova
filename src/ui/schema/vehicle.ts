import { z as schema } from "zod";
import { currencyStringToNumber } from "@ui/masks/currency";

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

export const VehicleToBeUpdatedSchema = VehicleSchema.pick({
  id: true,
  name: true,
  manufacturer: true,
  model: true,
  price: true,
});

export type VehicleToBeUpdated = schema.infer<typeof VehicleToBeUpdatedSchema>;

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
    .min(1, { message: "Insira o preço do veículo" })
    .refine((priceString) => priceString !== "R$ " && priceString !== "R$", {
      message: "Insira o preço do veículo",
    })
    .transform((priceString) => {
      return currencyStringToNumber(priceString);
    }),
});

export type NewVehicleFormInputs = schema.infer<typeof NewVehicleFormSchema>;
