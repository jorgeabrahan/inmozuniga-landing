export default function PhoneIcon({
  id,
  className,
  size = "24px",
  strokeWidth = "1.5",
}: {
  id?: string;
  className?: string;
  size?: string;
  strokeWidth?: string;
}) {
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
        d="M18.1182 14.702L14 15.5C11.2183 14.1038 9.5 12.5 8.5 10L9.26995 5.8699L7.81452 2L4.0636 2C2.93605 2 2.04814 2.93178 2.21654 4.04668C2.63695 6.83 3.87653 11.8765 7.5 15.5C11.3052 19.3052 16.7857 20.9564 19.802 21.6127C20.9668 21.8662 22 20.9575 22 19.7655L22 16.1812L18.1182 14.702Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
