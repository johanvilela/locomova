import { supabase } from "@server/infra/db/supabase";
import {
  Vehicle,
  VehicleSchema,
  createNewVehicleParams,
} from "@server/schema/vehicle";
import { HttpNotFoundError } from "@server/infra/error";

interface VehicleRepositoryGetParams {
  page?: number;
  limit?: number;
}
interface VehicleRepositoryGetOutput {
  vehicles: Vehicle[];
  total: number;
  pages: number;
}

async function get({
  page,
  limit,
}: VehicleRepositoryGetParams): Promise<VehicleRepositoryGetOutput> {
  const currentPage = page || 1;
  const currentLimit = limit || 10;
  const startIndex = (currentPage - 1) * currentLimit;
  const endIndex = currentPage * currentLimit - 1;

  const { data, error, count } = await supabase
    .from("vehicles")
    .select("*", {
      count: "exact",
    })
    .order("price", {
      ascending: true,
    })
    .range(startIndex, endIndex);
  if (error) throw new Error("Failed to fetch data");

  const parsedData = VehicleSchema.array().safeParse(data);
  if (!parsedData.success)
    throw new Error("Failed to parse vehicles from database");

  const vehicles = parsedData.data;
  const total = count || data.length;
  const totalPages = Math.ceil(total / currentLimit);

  return {
    vehicles,
    total,
    pages: totalPages,
  };
}

async function createNewVehicle({
  name,
  manufacturer,
  model,
  price,
  image_path,
}: createNewVehicleParams): Promise<Vehicle> {
  const { data, error } = await supabase
    .from("vehicles")
    .insert([
      {
        name,
        manufacturer,
        model,
        price,
        image_path,
      },
    ])
    .select()
    .single();
  if (error) throw new Error("Failed to create vehicle");

  const parsedVehicle = VehicleSchema.parse(data);

  return parsedVehicle;
}

async function updateById({
  id,
  name,
  manufacturer,
  model,
  price,
  image_path,
}: Partial<Vehicle>): Promise<Vehicle> {
  const { data, error } = await supabase
    .from("vehicles")
    .update({
      name,
      manufacturer,
      model,
      price,
      image_path,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Failed to get vehicle by id");

  const parsedData = VehicleSchema.safeParse(data);
  if (!parsedData.success) throw new Error("Failed to return updated vehicle");

  return parsedData.data;
}

async function deleteById(id: string) {
  const { error } = await supabase.from("vehicles").delete().match({ id });

  if (error) throw new HttpNotFoundError(`Vehicle with id "${id}" not found`);
}

export const vehicleRepository = {
  get,
  createNewVehicle,
  updateById,
  deleteById,
};
