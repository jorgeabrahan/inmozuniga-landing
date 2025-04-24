import MinusIcon from "@icons/MinusIcon";
import PlusIcon from "@icons/PlusIcon";
import { useEffect } from "react";

interface InputProps {
  id: string;
  className?: string;
  placeholder?: string;
  label?: string | React.ReactNode;
  required?: boolean;
  value?: number;
  setValue?: (value: number) => void;
  valueFormatter?: (value: number) => string;
  min?: number;
  max?: number;
}

export default function InputCounter({
  id,
  className = "",
  label = "",
  required = false,
  value = 0,
  setValue = () => {},
  valueFormatter = (value) => value.toString(),
  min = 0,
  max = 100,
}: InputProps) {
  useEffect(() => {
    if (value < min) {
      setValue(min);
    }
    if (value > max) {
      setValue(max);
    }
  }, [value]);
  const decrement = () => {
    if (value <= min) return;
    setValue(value - 1);
  };
  const increment = () => {
    if (value >= max) return;
    setValue(value + 1);
  };
  return (
    <div className="flex items-center justify-between">
      <label className="text-black-800" htmlFor={id}>
        {label}
      </label>
      <div className="flex items-center gap-4">
        <button
          className={`border border-black-800/50 rounded-full p-1 outline-none ${value <= min ? "opacity-50" : ""}`}
          type="button"
          onClick={decrement}
          disabled={value <= min}
        >
          <MinusIcon size={16} />
        </button>
        <input
          id={id}
          name={id}
          type="text"
          className={`bg-transparent w-[3ch] font-mono text-center ${className}`}
          value={valueFormatter(value)}
          disabled
          required={required}
        />
        <button
          className={`border border-black-800/50 rounded-full p-1 outline-none ${value >= max ? "opacity-50" : ""}`}
          type="button"
          onClick={increment}
          disabled={value >= max}
        >
          <PlusIcon size={16} />
        </button>
      </div>
    </div>
  );
}
