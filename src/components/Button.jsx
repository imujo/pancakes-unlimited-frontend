import React from "react";
import { TailSpin } from "react-loader-spinner";
import { BUTTON_TYPES } from "../utils/constants";

export default function Button({
  title,
  loading,
  disabled,
  className,
  buttonType = BUTTON_TYPES.FILL,

  ...rest
}) {
  return (
    <button
      {...rest}
      className={` 
         px-4 py-2 flex justify-center rounded-lg border-2 border-transparent  font-semibold self-end  transition duration-150
        ${buttonType === BUTTON_TYPES.FILL && " bg-blue-600 text-white"}
        ${
          buttonType === BUTTON_TYPES.OUTLINE &&
          " bg-blue-50 text-blue-600  border-blue-600  hover:bg-blue-600 hover:text-white  "
        }

        ${disabled && " pointer-events-none "}
        
        ${className} 
      `}
      disabled={loading || disabled}
    >
      {!!loading ? (
        <TailSpin
          height={24}
          width={24}
          color="#ffff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        title
      )}
    </button>
  );
}
