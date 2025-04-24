export default function CloseIcon({
  id,
  className,
  size = "24",
}: {
  id?: string;
  className?: string;
  size?: string;
}) {
  return (
    <svg
      id={id}
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M18 6l-12 12"></path>
      <path d="M6 6l12 12"></path>
    </svg>
  );
}
