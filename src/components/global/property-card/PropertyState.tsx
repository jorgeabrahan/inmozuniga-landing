import type { TypeCosmicProperty } from "@lib/types/Database";

export default function PropertyState({
  property,
}: {
  property: TypeCosmicProperty;
}) {
  return (
    <div className="absolute z-10 top-0 right-0 text-white uppercase text-xs font-semibold flex gap-2">
      <span className="bg-harvest-gold-700/15 backdrop-blur-lg px-3 py-1 rounded-bl-lg rounded-tr-xl">
        {property.metadata.category.value}
        {"  "}•{"  "}
        {property.metadata.availability.value}
      </span>
    </div>
  );
}
