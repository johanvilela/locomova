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
import { normalizeCurrency } from "@ui/masks/currency";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { Uppy } from "@uppy/core";
import { Dashboard as FileUploader } from "@uppy/react";
import Tus, { TusDetailedError } from "@uppy/tus";
import Portuguese from "@uppy/locales/lib/pt_BR";
import { useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabasePrivateKey = process.env.NEXT_PUBLIC_SUPABASE_PRIVATE_KEY || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseBucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME || "";
const supabasePublicPath = "/storage/v1/object/public";
const supabaseTusPath = "/storage/v1/upload/resumable";

const uppyOptions = {
  locale: {
    ...Portuguese,
    strings: {
      ...Portuguese.strings,
      browseFiles: "escolha",
      dropPasteFiles: "Arraste uma imagem aqui ou %{browse}",
    },
  },
  restrictions: {
    maxNumberOfFiles: 1,
    allowedFileTypes: [".png", ".jpeg", ".jpg"],
  },
};

const tusOptions = {
  endpoint: supabaseUrl + supabaseTusPath,
  headers: {
    authorization: `Bearer ${supabasePrivateKey}`,
    apikey: supabaseAnonKey,
  },
  uploadDataDuringCreation: true,
  chunkSize: 6 * 1024 * 1024,
  allowedMetaFields: [
    "bucketName",
    "objectName",
    "contentType",
    "cacheControl",
  ],
  onError: function (error: TusDetailedError | Error) {
    console.error("Tus error:", error);
  },
};

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
    price:
      (normalizeCurrency(
        vehicleToUpdate?.price.toFixed(2)
      ) as unknown as number) || ("R$ " as unknown as number),
    imageUrl: vehicleToUpdate?.image_path || "",
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<NewVehicleFormInputs>({
    resolver: zodResolver(NewVehicleFormSchema),
    defaultValues: defaultValues,
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<NewVehicleFormInputs> = async (
    data: NewVehicleFormInputs
  ) => {
    if (mode === "create" && !!create) {
      const response = await uppy.upload();
      if (response && response.successful && response.successful.length > 0) {
        create({ ...data, image_path: data.imageUrl }).then(() => {
          reset();
          uppy.clear();
        });
      } else {
        setError("imageUrl", {
          message: "Tente outra imagem",
        });
      }
    }

    if (mode === "update" && !!update && !!vehicleToUpdate) {
      if (!changePhoto) {
        update({
          id: vehicleToUpdate.id,
          ...data,
          image_path: data.imageUrl,
        }).then(() => {
          // TODO: Close Dialog
        });
      } else {
        const response = await uppy.upload();
        if (response && response.successful && response.successful.length > 0) {
          update({
            id: vehicleToUpdate.id,
            ...data,
            image_path: data.imageUrl,
          }).then(() => {
            uppy.clear();
            setChangePhoto(false);
            // TODO: Close Dialog
          });
        } else {
          setError("imageUrl", {
            message: "Tente outra imagem",
          });
        }
      }
    }
  };

  const [uppy] = useState(() => new Uppy(uppyOptions).use(Tus, tusOptions));

  // TODO: rename file before upload to avoid duplicated filenames (prefix vehicle id)
  uppy.on("file-added", (file) => {
    const supabaseMetadata = {
      bucketName: supabaseBucketName,
      objectName: file.name,
      contentType: file.type,
    };

    file.meta = {
      ...file.meta,
      ...supabaseMetadata,
    };

    setValue(
      "imageUrl",
      `${supabaseUrl}${supabasePublicPath}/${supabaseBucketName}/${file.name}`
    );
    clearErrors("imageUrl");
  });

  uppy.on("file-removed", () => {
    setValue("imageUrl", "");
  });

  uppy.on("cancel-all", () => {
    clearErrors("imageUrl");
  });

  const [changePhoto, setChangePhoto] = useState(false);
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
          <Input
            type="text"
            id="price"
            {...register("price", {
              onChange(e) {
                e.target.value = normalizeCurrency(e.target.value);
              },
            })}
          />
          <span className="text-xs text-red-400 text-center">
            {errors.price?.message}
          </span>
        </div>

        <Label>Foto</Label>
        {mode === "update" && !changePhoto && (
          <Button
            variant={"secondary"}
            onClick={() => {
              setChangePhoto(true);
              setValue("imageUrl", "");
            }}
          >
            Trocar foto
          </Button>
        )}
        {(mode === "create" || changePhoto) && (
          <FileUploader
            uppy={uppy}
            hideUploadButton
            height={"100%"}
            width={"100%"}
          />
        )}

        <span className="text-xs text-red-400 text-center">
          {errors.imageUrl?.message}
        </span>
        <Input
          className="hidden"
          type="url"
          id="image-url"
          {...register("imageUrl")}
        />
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
