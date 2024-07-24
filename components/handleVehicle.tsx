import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NewVehicle,
  NewVehicleFormInputs,
  NewVehicleFormSchema,
  Vehicle,
  VehicleToBeUpdated,
} from "@ui/schema/vehicle";

interface HandleVehicleParams {
  create?: (data: NewVehicle) => Promise<void>;
  update?: (data: VehicleToBeUpdated) => Promise<void>;
  mode: "create" | "update";
  vehicleToUpdate?: Vehicle;
}

export default function HandleVehicle({
  create,
  update,
  mode,
  vehicleToUpdate,
}: HandleVehicleParams) {
  const defaultValues = {
    name: vehicleToUpdate?.name || "",
    manufacturer: vehicleToUpdate?.manufacturer || "",
    model: vehicleToUpdate?.model || "",
    price: (vehicleToUpdate?.price as number) || ("" as unknown as number), // coerce to use reset() function
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewVehicleFormInputs>({
    resolver: zodResolver(NewVehicleFormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<NewVehicleFormInputs> = (data: NewVehicle) => {
    if (mode === "create" && !!create) {
      create(data).then(() => {
        reset();
      });
    }

    if (mode === "update" && !!update && !!vehicleToUpdate) {
      update({
        id: vehicleToUpdate.id,
        ...data,
      }).then(() => {
        // TODO: Close Dialog
      });
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        {mode === "create" && (
          <>
            <DialogTitle>Adicionar um veículo</DialogTitle>
            <DialogDescription>
              Insira os dados do novo veículo
            </DialogDescription>
          </>
        )}

        {mode === "update" && (
          <>
            <DialogTitle>Editar veículo</DialogTitle>
            <DialogDescription>Altere os dados do veículo</DialogDescription>
          </>
        )}
      </DialogHeader>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            type="text"
            id="name"
            placeholder="Exemplo: HB20"
            {...register("name")}
          />
          <span className="text-xs text-red-400 text-center">
            {errors.name?.message}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="manufacturer">Montadora</Label>
          <Input
            type="text"
            id="manufacturer"
            placeholder="Exemplo: Hyundai"
            {...register("manufacturer")}
          />
          <span className="text-xs text-red-400 text-center">
            {errors.manufacturer?.message}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="model">Modelo</Label>
          <Input
            type="text"
            id="model"
            placeholder="Exemplo: 1.0 Sense Plus 2025"
            {...register("model")}
          />
          <span className="text-xs text-red-400 text-center">
            {errors.model?.message}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="price">Preço</Label>
          <Input type="number" id="price" {...register("price")} />
          <span className="text-xs text-red-400 text-center">
            {errors.price?.message}
          </span>
        </div>

        {/* TODO: upload image */}
        {/* <div className="flex flex-col gap-2">
              <Label htmlFor="image">Foto</Label>
              <Input
                type="file"
                id="image"
                accept="image/*"
                // {...register("image")}
              />
            </div> */}
      </form>
      <DialogFooter>
        {mode === "create" && (
          <Button onClick={handleSubmit(onSubmit)}>Adicionar</Button>
        )}
        {mode === "update" && (
          <Button onClick={handleSubmit(onSubmit)}>Salvar</Button>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
