import { vehicleRepository } from "@server/repository/vehicle";
import { NextApiRequest, NextApiResponse } from "next";
import {
  GetVehiclesQuerySchema,
  VehicleCreateBodySchema,
} from "@server/schema/vehicle";

async function get(req: NextApiRequest, res: NextApiResponse) {
  const urlSearchParams = req.query;
  const parsedQuery = GetVehiclesQuerySchema.safeParse(urlSearchParams);
  if (!parsedQuery.success) {
    res.status(400).json({
      error: {
        message: "Invalid query",
        description: parsedQuery.error.issues,
      },
    });
    return;
  }
  const params = parsedQuery.data;

  try {
    const output = await vehicleRepository.get({
      page: params.page,
      limit: params.limit,
    });

    res.status(200).json({
      total: output.total,
      pages: output.pages,
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
