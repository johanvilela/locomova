import { vehicleRepository } from "@server/repository/vehicle";
import { NextApiRequest, NextApiResponse } from "next";
import { VehicleCreateBodySchema } from "@server/schema/vehicle";

async function get(req: NextApiRequest, res: NextApiResponse) {
  try {
    const output = await vehicleRepository.get();

    res.status(200).json({
      vehicles: output.vehicles,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Failed to get vehicles",
      },
    });
  }
}

async function create(req: NextApiRequest, res: NextApiResponse) {
  const parsedBody = VehicleCreateBodySchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({
      error: {
        message: "Invalid body data format",
        description: parsedBody.error.issues,
      },
    });
    return;
  }
  const vehicleData = parsedBody.data;

  try {
    const createdVehicle = await vehicleRepository.createNewVehicle(
      vehicleData
    );

    res.status(201).json({
      vehicle_id: createdVehicle.id,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Failed to create vehicle",
      },
    });
  }
}

export const vehicleController = {
  get,
  create,
};
