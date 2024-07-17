import { vehicleRepository } from "@server/repository/vehicle";
import { NextApiRequest, NextApiResponse } from "next";
import {
  DeleteVehicleQuerySchema,
  GetVehiclesQuerySchema,
  VehicleCreateBodySchema,
} from "@server/schema/vehicle";
import { HttpNotFoundError } from "@server/infra/error";

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

async function deleteById(req: NextApiRequest, res: NextApiResponse) {
  const urlParams = req.query;
  const parsedQuery = DeleteVehicleQuerySchema.safeParse(urlParams);
  if (!parsedQuery.success) {
    return res.status(400).json({
      error: {
        message: "You must to provide a valid id",
      },
    });
  }

  try {
    const vehicleId = parsedQuery.data.id;
    await vehicleRepository.deleteById(vehicleId);
    res.status(204).end();
  } catch (err) {
    if (err instanceof HttpNotFoundError) {
      res.status(err.status).json({
        error: {
          message: err.message,
        },
      });
    }

    res.status(500).json({
      error: {
        message: "Internal server error",
      },
    });
  }
}

export const vehicleController = {
  get,
  create,
  deleteById,
};
