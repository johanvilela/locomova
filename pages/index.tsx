import VehicleCard from "@/components/vehicleCard";
import { vehicleController } from "@/src/ui/controller/vehicle";
import { Vehicle } from "@/src/ui/schema/vehicle";
import { useEffect, useState } from "react";

export default function Page() {
  const [page] = useState(1);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    vehicleController.get({ page }).then(({ vehicles, pages }) => {
      setVehicles(vehicles);
      setTotalPages(pages);
    });
  }, []);

  return (
    <>
      <div className="flex w-full justify-center">
        {/* Car Grid */}
        <div className="w-full max-w-[800px] grid grid-cols-1 md:grid-cols-2 gap-4 my-8 px-4 lg:px-0">
          {vehicles.map((vehicle) => {
            return (
              <VehicleCard
                key={vehicle.id}
                manufacturer={vehicle.manufacturer}
                name={vehicle.name}
                model={vehicle.model}
                price={vehicle.price}
                imagePath={vehicle.image_path}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
