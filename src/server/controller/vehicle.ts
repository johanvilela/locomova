import { vehicleRepository } from "@server/repository/vehicle";
import { NextApiRequest, NextApiResponse } from "next";

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

export const vehicleController = {
  get,
};
