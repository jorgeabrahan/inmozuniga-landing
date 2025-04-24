export default function SearchIcon({
  id,
  className,
  size = "24px",
}: {
  id?: string;
  className?: string;
  size?: string | number;
}) {
  return (
    <svg
      id={id}
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      color="currentColor"
    >
      <path
        d="M17 17L21 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
