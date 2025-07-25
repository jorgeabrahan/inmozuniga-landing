export default function Delimiter({
  as: Tag = "section",
  id = "",
  className = "",
  children,
  ...props
}: {
  as?: React.ElementType;
  id?: string;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Tag
      id={id}
      className={`px-3 lg:px-6 xl:px-8 w-full max-w-[1500px] mx-auto ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
