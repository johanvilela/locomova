import {
  NewVehicle,
  Vehicle,
  VehicleSchema,
  VehicleToBeUpdated,
} from "@ui/schema/vehicle";
import { z as schema } from "zod";

interface VehicleRepositoryGetParams {
  page: number;
  limit: number;
}
interface VehicleRepositoryGetOutput {
  total: number;
  pages: number;
  vehicles: Vehicle[];
}

const VehicleRepositoryGetOutputSchema = schema.object({
  total: schema.number(),
  pages: schema.number(),
  vehicles: VehicleSchema.array(),
});

function get({
  page,
  limit,
}: VehicleRepositoryGetParams): Promise<VehicleRepositoryGetOutput> {
  return fetch(`/api/vehicles?page=${page}&limit=${limit}`).then(
    async (serverResponse) => {
      const response = await serverResponse.json();

      const parsedData = VehicleRepositoryGetOutputSchema.safeParse(response);
      if (!parsedData.success) {
        throw new Error("Failed to parse data from API");
      }

      return {
        total: parsedData.data.total,
        pages: parsedData.data.pages,
        vehicles: parsedData.data.vehicles,
      };
    }
  );
}

async function create(vehicle: NewVehicle): Promise<void> {
  const response = await fetch("api/vehicles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...vehicle,
      image_path: "/cars/example-car.jpg",
    }),
  });

  if (response.ok) {
    return;
  }

  throw new Error("Failed to create vehicle");
}

async function update(vehicle: VehicleToBeUpdated) {
  const id = vehicle.id;
  const vehicleData = {
    name: vehicle.name,
    manufacturer: vehicle.manufacturer,
    model: vehicle.model,
    price: vehicle.price,
  };
  const response = await fetch(`/api/vehicles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...vehicleData,
      image_path: "/cars/example-car.jpg",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update vehicle");
  }

  return;
}

async function deleteById(id: string): Promise<void> {
  const response = await fetch(`/api/vehicles/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Failed to delete");
  }

  return;
}

export const vehicleRepository = {
  get,
  create,
  update,
  deleteById,
};
