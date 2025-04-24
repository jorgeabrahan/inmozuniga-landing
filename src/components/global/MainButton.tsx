interface MainButtonProps {
  id?: string;
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function MainButton({
  id,
  text,
  className = "",
  type = "button",
}: MainButtonProps) {
  return (
    <button
      id={id}
      type={type}
      className={`bg-harvest-gold-700 relative duration-300 text-white px-6 py-3 rounded-xl flex items-center gap-4 text-lg before:content-[''] before:absolute before:left-[-10px] before:w-0 before:h-[calc(100%+20px)] before:bg-harvest-gold-600 before:rounded-full hover:before:w-[calc(100%+20px)] before:transition-[width] before:duration-700 before:ease-in-out overflow-hidden active:scale-95 ${!className.includes("w-") && "w-max"} ${className}`}
    >
      <span className="z-10 w-full">{text}</span>
    </button>
  );
}
