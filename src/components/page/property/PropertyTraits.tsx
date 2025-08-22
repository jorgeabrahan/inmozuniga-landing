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
    <section className="grid grid-cols-4 gap-4">
      <PropertyTrait trait={bedrooms} title="Habitaciones">
        <BedIcon size="30px" />
      </PropertyTrait>
      <PropertyTrait trait={bathrooms} title="Baños">
        <BathroomIcon size="30px" />
      </PropertyTrait>
      <PropertyTrait trait={parking_lots} title="Estacionamientos">
        <CarIcon size="30px" />
      </PropertyTrait>
      <PropertyTrait
        trait={meters}
        title="Metros de construcción"
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
