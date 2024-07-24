import { vehicleRepository } from "@ui/repository/vehicle";
import {
  NewVehicle,
  NewVehicleSchema,
  VehicleToBeUpdated,
  VehicleToBeUpdatedSchema,
} from "@ui/schema/vehicle";

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

  vehicleRepository
    .create(parsedData.data)
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });
}

interface VehicleControllerUpdateParams {
  vehicle: VehicleToBeUpdated;
  onError: () => void;
  onSuccess: () => void;
}
function update({
  vehicle,
  onError,
  onSuccess,
}: VehicleControllerUpdateParams) {
  const parsedData = VehicleToBeUpdatedSchema.safeParse(vehicle);
  if (!parsedData.success) {
    onError();
    return;
  }
  const vehicleData = parsedData.data;

  vehicleRepository
    .update(vehicleData)
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });
}

async function deleteById(id: string) {
  await vehicleRepository.deleteById(id);
}

export const vehicleController = {
  get,
  create,
  update,
  deleteById,
};
