import React from "react";
import InputField from "./InputField";
import { AiOutlineSearch } from "react-icons/ai";

export default function Input({
  title,
  name,
  icon,
  details,
  error,
  setErrors,
  className,
  ...rest
}) {
  return (
    <div
      className={`
    flex flex-column flex-col my-6
    ${className}
    `}
    >
      <label
        htmlFor={name}
        className=" font-medium text-slate-500 pb-4 text-md "
      >
        {title}
      </label>
      <InputField
        icon={icon}
        placeholder="What is your name?"
        error={error}
        setErrors={setErrors}
        name={name}
        {...rest}
      />
      {error?.msg && <p className=" text-sm text-red-500 pt-2">{error.msg}</p>}
      {!!details && <p className=" text-sm text-slate-400 pt-2">{details}</p>}
    </div>
  );
}
