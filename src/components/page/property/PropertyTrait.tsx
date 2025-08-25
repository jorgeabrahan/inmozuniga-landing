import type { ReactNode } from "react";

interface PropertyTraitProps {
  trait: number;
  title: string;
  children: ReactNode;
  unitMeasurement?: ReactNode;
  className?: string;
}

export default function PropertyTrait({
  trait,
  title,
  children,
  unitMeasurement,
  className,
}: PropertyTraitProps) {
  if (trait <= 0) return null;

  return (
    <div className={`py-4 px-3 ${className}`}>
      <div
        className="flex items-center justify-center gap-4 mb-3"
        title={title}
      >
        {children}
        <span className="font-light leading-[1] text-[22px]">
          {`${trait} `}
          {unitMeasurement}
        </span>
      </div>
      <p className="text-center font-light leading-tight text-sm">{title}</p>
    </div>
  );
}
