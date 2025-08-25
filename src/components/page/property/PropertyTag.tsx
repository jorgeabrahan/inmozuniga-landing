export const PropertyTag = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`px-2 py-[2px] rounded-lg border border-black/40 flex items-center gap-1 font-light text-sm ${className}`}
    >
      {children}
    </span>
  );
};
