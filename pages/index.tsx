import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import VehicleCard from "@/components/vehicleCard";
import { vehicleController } from "@ui/controller/vehicle";
import { Vehicle } from "@ui/schema/vehicle";
import { useEffect, useState } from "react";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVehicles, setTotalVehicles] = useState(0);

  useEffect(() => {
    vehicleController
      .get({ page: currentPage })
      .then(({ vehicles, pages, total }) => {
        setVehicles(vehicles);
        setTotalPages(pages);
        setTotalVehicles(total);
      });
  }, [currentPage]);

  return (
    <>
      <div className="flex flex-col w-full items-center my-8 gap-8">
        <header className="text-xl md:text-3xl font-serif font-bold text-slate-600 select-none">
          · LOCOMOVA ·
        </header>

        <main className="flex flex-col gap-4 w-full items-center">
          {/* Car Grid */}
          <div className="w-full max-w-[800px] grid grid-cols-1 md:grid-cols-2 gap-4 px-4 lg:px-0 ">
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

          {/* Pagination */}
          {totalPages > 1 && (
            <>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => {
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={page === currentPage}
                            onClick={() => {
                              setCurrentPage(page);
                            }}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => {
                        if (currentPage < totalPages)
                          setCurrentPage(currentPage + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <div className="text-xs text-muted-foreground">
                Exibindo{" "}
                <strong>
                  {currentPage * 10 - 9}-
                  {currentPage === totalPages
                    ? totalVehicles
                    : currentPage * 10}
                </strong>{" "}
                de <strong>{totalVehicles}</strong> veículos
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}
