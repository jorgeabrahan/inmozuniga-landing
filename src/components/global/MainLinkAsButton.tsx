export const MainLinkAsButton = ({
  url,
  text,
  target = "_self",
  className = "",
  textClassName = "",
  children,
}: {
  url: string;
  text: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  className?: string;
  textClassName?: string;
  children?: React.ReactNode;
}) => {
  return (
    <a
      className={`bg-harvest-gold-700 relative duration-300 text-white px-6 py-3 rounded-xl flex items-center gap-4 w-max text-lg before:content-[''] before:absolute before:left-[-10px] before:w-0 before:h-[calc(100%+20px)] before:bg-harvest-gold-600 before:rounded-full hover:before:w-[calc(100%+20px)] before:transition-[width] before:duration-700 before:ease-in-out overflow-hidden active:scale-95 ${className}`}
      href={url}
      target={target}
    >
      <span className={`z-10 w-full ${textClassName}`}>
        {children}
        {text}
      </span>
    </a>
  );
};
