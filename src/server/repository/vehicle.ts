import { supabase } from "@server/infra/db/supabase";
import { Vehicle, VehicleSchema } from "@server/schema/vehicle";

interface VehicleRepositoryGetOutput {
  vehicles: Vehicle[];
}

async function get(): Promise<VehicleRepositoryGetOutput> {
  const { data, error } = await supabase.from("vehicles").select("*");
  if (error) throw new Error("Failed to fetch data");

  const parsedData = VehicleSchema.array().safeParse(data);
  if (!parsedData.success)
    throw new Error("Failed to parse vehicles from database");

  const vehicles = parsedData.data;

  return { vehicles };
}

interface createNewVehicleParams {
  name: string;
  manufacturer: string;
  model: string;
}

async function createNewVehicle({
  name,
  manufacturer,
  model,
}: createNewVehicleParams): Promise<Vehicle> {
  const { data, error } = await supabase
    .from("vehicles")
    .insert([
      {
        name,
        manufacturer,
        model,
      },
    ])
    .select()
    .single();
  if (error) throw new Error("Failed to create vehicle");

  const parsedVehicle = VehicleSchema.parse(data);

  return parsedVehicle;
}

export const vehicleRepository = {
  get,
  createNewVehicle,
};
