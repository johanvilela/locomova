import { Vehicle, VehicleSchema } from "@ui/schema/vehicle";
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

export const vehicleRepository = {
  get,
};
