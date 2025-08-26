import NavArrowDownIcon from "@icons/NavArrowDownIcon";

interface SelectProps {
  id: string;
  className?: string;
  label?: string;
  options: { value: string; label: string }[];
}

export default function Select({
  id,
  className = "",
  label = "",
  options = [],
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & SelectProps) {
  return (
    <div
      className="relative w-full"
      data-id="custom-select-wrapper"
      data-is-open="false"
    >
      <label
        htmlFor={id}
        className="absolute top-0 left-4 -translate-y-[45%] bg-white text-black-800 px-2 text-sm"
      >
        {label}
      </label>
      <select
        name={id}
        id={id}
        className={`w-full rounded-xl py-5 px-4 border border-black-800/50 font-[inherit] focus:border-black transition-colors duration-300 cursor-pointer ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <NavArrowDownIcon className="absolute top-[50%] right-4 -translate-y-[50%] text-black-800 pointer-events-none bg-white" />
    </div>
  );
}
