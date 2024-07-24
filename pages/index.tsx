import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import Image from "next/image";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

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
      <div className="flex flex-col w-full items-center sm:mt-4 mb-8 gap-4">
        <header className="w-full z-30 flex h-14 sm:h-auto items-center justify-end gap-4 border-b bg-background px-4 sm:static sm:border-0 sm:bg-transparent sm:px-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  priority={true}
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="imgtar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <Link href={"/manage"}>
                <DropdownMenuItem className="gap-1">
                  <Settings className="h-5 w-5" />
                  Gerenciar
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="gap-1">
                <LogOut className="h-5 w-5" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex flex-col gap-4 w-full items-center">
          <div className="sm:mb-10 text-xl sm:text-3xl font-serif font-bold text-slate-600 select-none ">
            · LOCOMOVA ·
          </div>
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
