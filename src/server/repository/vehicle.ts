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

export const vehicleRepository = {
  get,
};
