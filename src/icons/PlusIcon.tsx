export default function PlusIcon({
  id,
  className,
  size = 24,
}: {
  id?: string;
  className?: string;
  size?: number | string;
}) {
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
        d="M6 12H12M18 12H12M12 12V6M12 12V18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
