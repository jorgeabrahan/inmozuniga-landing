import BathroomIcon from "@icons/BathroomIcon";
import BedIcon from "@icons/BedIcon";
import CarIcon from "@icons/CarIcon";
import RulerIcon from "@icons/RulerIcon";
import type { TypeCosmicProperty } from "@lib/types/Database";
import PropertyTrait from "./PropertyTrait";

interface PropertyTraitsProps {
  property: TypeCosmicProperty;
}

export default function PropertyTraits({ property }: PropertyTraitsProps) {
  const { bedrooms, bathrooms, parking_lots } = property.metadata.traits;
  const { meters, rods } = property.metadata.measurements;

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 py-8">
      <PropertyTrait
        trait={bedrooms}
        title="Habitaciones"
        className="border-r border-b md:border-b-0 lg:border-b xl:border-b-0"
      >
        <BedIcon size="30px" />
      </PropertyTrait>
      <PropertyTrait
        trait={bathrooms}
        title="Baños"
        className="border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b xl:border-b-0 xl:border-r"
      >
        <BathroomIcon size="30px" />
      </PropertyTrait>
      <PropertyTrait
        trait={parking_lots}
        title="Estacionamientos"
        className="border-r"
      >
        <CarIcon size="30px" />
      </PropertyTrait>
      <PropertyTrait
        trait={meters}
        title="Construcción"
        unitMeasurement={<span>m&sup2;</span>}
      >
        <RulerIcon size="30px" />
      </PropertyTrait>
      {!(meters > 0) && (
        <PropertyTrait
          trait={rods}
          title="Varas de terreno"
          unitMeasurement={<span>v&sup2;</span>}
        >
          <RulerIcon size="30px" />
        </PropertyTrait>
      )}
    </section>
  );
}
