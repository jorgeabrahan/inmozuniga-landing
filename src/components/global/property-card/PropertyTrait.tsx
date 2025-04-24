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
    <div className="flex items-center gap-1" title={title}>
      {children}
      <span className="font-light">
        {`${trait} `}
        {unitMeasurement}
      </span>
    </div>
  );
}
