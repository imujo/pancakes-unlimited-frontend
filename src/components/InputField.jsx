import React, { useRef } from "react";

const InputField = ({
  icon,
  error,
  setErrors = () => {
    console.log("setErrors not passed");
  },
  disabled = false,
  ...rest
}) => {
  const ref = useRef(null);

  const removeError = (ref) => {
    const name = ref.current.name;

    setErrors((prev) => {
      return { ...prev, [name]: null };
    });
  };

  let clonedIcon = null;
  if (!!icon) {
    clonedIcon = React.cloneElement(icon, {
      className: `text-slate-400 h-5 w-5 
      ${disabled && "text-slate-300"}
      `,
    });
  }

  return (
    <div
      className={`

      bg-slate-100 w-full rounded-md px-4 py-3 
      font-normal text-slate-600 outline-slate-400
      flex items-center gap-2 border-2 border-transparent focus-within:border-gray-400 

      ${!!error && "border-red-500 bg-red-100"}

          `}
    >
      {clonedIcon}
      <input
        className={` 
        bg-inherit focus:outline-none
         w-full
        ${disabled && " placeholder-slate-300"}
        
        `}
        ref={ref}
        onFocus={() => removeError(ref)}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};

export default InputField;
