import { supabase } from "@server/infra/db/supabase";
import {
  Vehicle,
  VehicleSchema,
  CreateNewVehicleParams,
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
}: CreateNewVehicleParams): Promise<Vehicle> {
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
  // Get current vehicle image URL
  const { data: vehicleData, error: vehicleError } = await supabase
    .from("vehicles")
    .select("image_path")
    .match({ id })
    .single();
  if (vehicleError)
    throw new HttpNotFoundError(`Vehicle with id "${id}" not found`);

  const currentImageUrl = vehicleData.image_path as string;
  const newImageUrl = image_path as string;

  if (newImageUrl !== currentImageUrl) {
    const currentImageName = currentImageUrl.split("/").pop() as string;

    // Check if image exists
    const { data: imageData } = await supabase.storage
      .from("cars")
      .download(currentImageName);
    if (!imageData)
      throw new Error(`Image with name "${currentImageName}" not found`);

    // Delete current image from file storage
    const { data: deletedData, error: deleteError } = await supabase.storage
      .from("cars")
      .remove([currentImageName]);
    if (deleteError)
      throw new Error(`Can't delete image "${currentImageName}"`);
    if (deletedData.length === 0)
      throw new Error(`Can't delete image "${currentImageName}"`);
  }

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
  // Get vehicle image URL
  const { data: vehicleData, error: vehicleError } = await supabase
    .from("vehicles")
    .select("image_path")
    .match({ id })
    .single();

  if (vehicleError)
    throw new HttpNotFoundError(`Vehicle with id "${id}" not found`);

  const imageUrl = vehicleData.image_path as string;
  const imageName = imageUrl.split("/").pop() as string;

  // Check if image exists
  const { data: imageData } = await supabase.storage
    .from("cars")
    .download(imageName);
  if (!imageData) throw new Error(`Image with name "${imageName}" not found`);

  // Delete image
  const { data: deletedData, error: deleteError } = await supabase.storage
    .from("cars")
    .remove([imageName]);
  if (deleteError) throw new Error(`Can't delete image "${imageName}"`);
  if (deletedData.length === 0)
    throw new Error(`Can't delete image "${imageName}"`);

  // Delete vehicle data from database
  const { error: deletingError } = await supabase
    .from("vehicles")
    .delete()
    .match({ id });
  if (deletingError)
    throw new HttpNotFoundError(`Vehicle with id "${id}" not found`);
}

export const vehicleRepository = {
  get,
  createNewVehicle,
  updateById,
  deleteById,
};
