import React from "react";

interface NavArrowDownIconProps {
  id?: string;
  className?: string;
  size?: number | string;
}

export default function NavArrowDownIcon({
  id,
  className,
  size = 24,
}: NavArrowDownIconProps) {
  return (
    <svg
      id={id}
      className={className}
      width={size}
      height={size}
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      color="currentColor"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
