import Image from "next/image";
import Link from "next/link";
import {
  Car,
  Home,
  LogOut,
  MoreHorizontal,
  PanelLeft,
  Pencil,
  Settings,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AddVehicle from "@/components/addVehicle";
import { useEffect, useState } from "react";
import { Vehicle } from "@ui/schema/vehicle";
import { vehicleController } from "@ui/controller/vehicle";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "react-toastify";

export default function Manage() {
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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Car className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Catálogo</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Catálogo</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Catálogo</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/manage"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Gerenciar</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Gerenciar</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between sm:justify-end gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Mostrar menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Car className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Catálogo</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Catálogo
                </Link>
                <Link
                  href="/manage"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Gerenciar
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
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
              <DropdownMenuItem className="gap-1">
                <Settings className="h-5 w-5" />
                Gerenciar
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-1">
                <LogOut className="h-5 w-5" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <AddVehicle />
              </div>
            </div>
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Veículos</CardTitle>
                <CardDescription>Gerencie todos os veículos.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Montadora</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Modelo
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Preço
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Opções</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map((vehicle) => {
                      return (
                        <TableRow key={vehicle.id}>
                          <TableCell className="hidden sm:table-cell">
                            <div className="w-16 bg-slate-800 text-slate-200 flex justify-center items-center aspect-square rounded-md">
                              <Car size={48} strokeWidth={1} />
                            </div>
                            {/* <Image
                              alt="Product image"
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src="/placeholder.svg"
                              width="64"
                            /> */}
                          </TableCell>
                          <TableCell className="font-medium">
                            {vehicle.name}
                          </TableCell>
                          <TableCell>{vehicle.manufacturer}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {vehicle.model}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(vehicle.price)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">
                                    Menu de opções
                                  </span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Opções</DropdownMenuLabel>
                                <DropdownMenuItem className="gap-1">
                                  <Pencil className="h-3.5 w-3.5" />
                                  Editar
                                  {/* TODO: implements update */}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="gap-1"
                                  onClick={() => {
                                    vehicleController
                                      .deleteById(vehicle.id)
                                      .then(() => {
                                        toast.success("Veículo excluído");
                                      })
                                      .catch(() => {
                                        toast.error("Não foi possível excluir");
                                      });
                                  }}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                {/* Pagination */}
                {totalPages > 1 && (
                  <>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => {
                              if (currentPage > 1)
                                setCurrentPage(currentPage - 1);
                            }}
                          />
                        </PaginationItem>

                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => {
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
                        })}

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
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
