export const HomeSaleIcon = ({
  id,
  className,
  size = 24,
}: {
  id?: string;
  className?: string;
  size?: number | string;
}) => {
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
        d="M14 9.84631C13 8.92323 10.3333 8.61555 10.3333 10.4617C10.3333 12.3079 14 11.3848 14 13.2309C14 15.0771 11 15.0771 10 13.8463"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12 14.7021V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12 9.11306V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M2 8L11.7317 3.13416C11.9006 3.04971 12.0994 3.0497 12.2683 3.13416L22 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M20 11V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
