interface NavArrowDownIconProps {
  id?: string;
  className?: string;
  strokeWidth?: string;
  size?: number | string;
}

export default function NavArrowDownIcon({
  id,
  className,
  strokeWidth = "1.5",
  size = 24,
}: NavArrowDownIconProps) {
  return (
    <svg
      id={id}
      className={className}
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      fill="none"
      color="currentColor"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
