import { vehicleRepository } from "@ui/repository/vehicle";

interface VehicleControllerGetParams {
  page: number;
}
async function get({ page }: VehicleControllerGetParams) {
  return vehicleRepository.get({
    page,
    limit: 10,
  });
}

export const vehicleController = {
  get,
};
