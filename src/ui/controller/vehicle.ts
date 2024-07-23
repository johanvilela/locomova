import { vehicleRepository } from "@ui/repository/vehicle";
import { NewVehicle, NewVehicleSchema } from "@ui/schema/vehicle";

interface VehicleControllerGetParams {
  page: number;
}
async function get({ page }: VehicleControllerGetParams) {
  return vehicleRepository.get({
    page,
    limit: 10,
  });
}

interface VehicleControllerCreateParams {
  vehicle: NewVehicle;
  onError: () => void;
  onSuccess: () => void;
}
function create({
  vehicle,
  onError,
  onSuccess,
}: VehicleControllerCreateParams) {
  const parsedData = NewVehicleSchema.safeParse(vehicle);
  if (!parsedData.success) {
    onError();
    return;
  }

  vehicleRepository.create(parsedData.data).then(() => {
    onSuccess();
  });
}

async function deleteById(id: string) {
  await vehicleRepository.deleteById(id);
}

export const vehicleController = {
  get,
  create,
  deleteById,
};
