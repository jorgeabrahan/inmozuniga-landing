import type { ReactNode } from "react";

interface PropertyTraitProps {
  trait: number;
  title: string;
  children: ReactNode;
  unitMeasurement?: ReactNode;
}

export default function PropertyTrait({
  trait,
  title,
  children,
  unitMeasurement,
}: PropertyTraitProps) {
  if (trait <= 0) return null;

  return (
    <div className="flex items-center gap-1 p-3" title={title}>
      {children}
      <span className="font-light leading-[1] text-2xl">
        {`${trait} `}
        {unitMeasurement}
      </span>
    </div>
  );
}
