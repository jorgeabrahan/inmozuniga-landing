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
  const amount = isRent ? propertyPrice.fee : propertyPrice.total;

  return (
    <p className="text-2xl font-light leading-[normal]">
      {UtilsFormat.asCurrency(amount)}
    </p>
  );
}
