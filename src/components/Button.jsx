import React from "react";
import { TailSpin } from "react-loader-spinner";

export default function Button({ title, loading, disabled, ...rest }) {
  return (
    <button
      {...rest}
      className={` bg-blue-600 px-4 py-2 w-full flex justify-center rounded-lg text-white font-semibold self-end `}
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
