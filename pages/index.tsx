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
      <div className="flex flex-col w-full items-center my-8 gap-8">
        <header className="text-xl md:text-3xl font-serif font-bold text-slate-600 select-none">
          · LOCOMOVA ·
        </header>
        {/* Car Grid */}
        <main className="w-full max-w-[800px] grid grid-cols-1 md:grid-cols-2 gap-4 px-4 lg:px-0">
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
        </main>
      </div>
    </>
  );
}
