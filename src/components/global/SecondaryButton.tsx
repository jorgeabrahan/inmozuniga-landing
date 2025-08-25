import type { ButtonHTMLAttributes } from "react";

export const SecondaryButton = ({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={`flex items-center gap-1 [&>*]:pointer-events-none bg-[#eeeeee] shadow-sm px-5 py-3 rounded-xl border border-solid border-[#aaaaaa10] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
