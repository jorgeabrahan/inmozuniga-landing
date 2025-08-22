import { PROPERTY_AVAILABILITY } from "@lib/constants/property";
import { UtilsFormat } from "@lib/utils/UtilsFormat";

interface PropertyPriceProps {
  propertyState: (typeof PROPERTY_AVAILABILITY)[keyof typeof PROPERTY_AVAILABILITY];
  propertyPrice: {
    fee: number;
    total: number;
  };
}

export default function PropertyPrice({
  propertyState,
  propertyPrice,
}: PropertyPriceProps) {
  const isRent = propertyState === PROPERTY_AVAILABILITY.rent;
  // const label = isRent ? "Cuota" : "Costo total";
  const amount = isRent ? propertyPrice.fee : propertyPrice.total;

  return (
    <div className="mb-1 flex flex-col">
      {/* <p className="font-light capitalize text-xs leading-[8px]">{label}</p> */}
      <p className="text-2xl font-light">{UtilsFormat.asCurrency(amount)}</p>
    </div>
  );
}
