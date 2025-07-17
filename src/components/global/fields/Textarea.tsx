import React, { useState } from "react";

interface TextAreaProps {
  id: string;
  className?: string;
  placeholder?: string;
  label?: string | React.ReactNode;
  rows?: number;
  required?: boolean;
}

export default function Textarea({
  id,
  className = "",
  placeholder = "",
  label = "",
  rows = 5,
  required = false,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="absolute top-0 left-4 -translate-y-[45%] bg-white text-black-800 px-2 text-sm z-10"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        className={`w-full rounded-xl py-5 px-4 border border-black-800/50 font-[inherit] focus:border-black transition-colors duration-300 ${className}`}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        rows={rows}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </div>
  );
}
