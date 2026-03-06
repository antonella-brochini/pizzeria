import React from "react";

const AuthError = ({ message, onClose }) => {
  return (
    <div className="p-2 text-center">
      <h3 className="text-main text-gray-500 capitalize">
        Authentication Error
      </h3>

      <p className="text-red-500 font-poppins my-6">{message}</p>

      <button
        onClick={onClose}
        className="focus:outline-none px-6 py-1 text-white bg-red-600 rounded"
      >
        Ok
      </button>
    </div>
  );
};

export default AuthError;