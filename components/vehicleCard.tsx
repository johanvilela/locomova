import Image from "next/image";

interface VehicleCardProps {
  name: string;
  manufacturer: string;
  model: string;
  price: number;
  imagePath: string;
}

export default function VehicleCard({
  name,
  manufacturer,
  model,
  price,
  imagePath,
}: VehicleCardProps) {
  return (
    <>
      <div className="border rounded-lg border-slate-300 h-32  flex flex-row overflow-hidden">
        {/* Picture of car */}
        <div className="h-24 ml-4 mr-1 relative aspect-video rounded-md overflow-hidden">
          <Image
            src={imagePath}
            alt={"foto do carro"}
            fill={true}
            objectFit="cover"
          />
        </div>
        {/* Details about */}
        <div className=" flex flex-col flex-1 p-2">
          <div className="mb-2">
            <div className="text-lg font-bold text-slate-800">
              {manufacturer} · {name}
            </div>
            <div className=" text-xs font-light text-slate-600">{model}</div>
          </div>
          <hr />
          <div className="text-xl text-slate-700 font-semibold flex flex-1 items-center">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(price)}
          </div>
        </div>
      </div>
    </>
  );
}
