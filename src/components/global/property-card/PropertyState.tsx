import type { PROPERTY_AVAILABILITY } from "@lib/constants/property";

export default function PropertyState({
  propertyState,
}: {
  propertyState: (typeof PROPERTY_AVAILABILITY)[keyof typeof PROPERTY_AVAILABILITY];
}) {
  return (
    <span className="absolute z-10 top-4 right-4 text-white bg-black-950/80 px-3 py-1 rounded-lg uppercase text-xs font-semibold">
      {propertyState}
    </span>
  );
}
