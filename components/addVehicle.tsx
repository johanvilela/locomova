import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NewVehicle,
  NewVehicleFormInputs,
  NewVehicleFormSchema,
} from "@ui/schema/vehicle";

interface AddVehicleParams {
  create: (data: NewVehicle) => Promise<void>;
}

export default function AddVehicle({ create }: AddVehicleParams) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewVehicleFormInputs>({
    resolver: zodResolver(NewVehicleFormSchema),
    defaultValues: {
      name: "",
      manufacturer: "",
      model: "",
      price: "" as unknown as number, // coerce to use reset() function
    },
  });

  const onSubmit: SubmitHandler<NewVehicleFormInputs> = (data: NewVehicle) => {
    create(data)
      .then(() => {
        reset();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Adicionar veículo</span>
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar um veículo</DialogTitle>
            <DialogDescription className="hidden">
              Add a new vehicle
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
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
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit(onSubmit)}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
