import React, { useEffect, useRef, useState } from "react";
import intlTelInput from "intl-tel-input";
// import intlTelInput, { Iti } from "intl-tel-input";
import { intlTelInputSettings } from "@lib/constants";

interface InputProps {
  id: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  groupClassName?: string;
  placeholder?: string;
  label?: string | React.ReactNode;
  required?: boolean;
  refIntlInputInstance?: React.MutableRefObject<any | null>;
  icon?: ({ size }: { size: string | number }) => React.JSX.Element;
}

export default function Input({
  id,
  type = "text",
  className = "",
  groupClassName = "",
  placeholder = "",
  label = "",
  required = false,
  icon,
  refIntlInputInstance,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & InputProps) {
  const hasIcon = icon != null;
  const refInput = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (type === "tel" && refInput.current && refIntlInputInstance) {
      const instance = intlTelInput(refInput.current, intlTelInputSettings);
      refIntlInputInstance.current = instance;
    }
  }, [type]);

  return (
    <div className={`relative w-full ${groupClassName}`} data-group-id={id}>
      <label
        htmlFor={id}
        className="absolute top-0 left-4 z-10 -translate-y-[45%] bg-white text-black-800 px-2 text-sm"
      >
        {label}
      </label>
      {hasIcon && (
        <span
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-300 ${isFocused ? "text-black" : "text-black-800/50"}`}
        >
          {React.createElement(icon, { size: 20 })}
        </span>
      )}
      <input
        ref={refInput}
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-xl py-5 border border-black-800/50 font-[inherit] focus:border-black transition-colors duration-300 ${hasIcon ? "pl-12 pr-4" : "px-4"} ${className}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        spellCheck={false}
        autoComplete="off"
        required={required}
        {...props}
      />
    </div>
  );
}
