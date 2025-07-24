import React from "react";

function Input({ type, placeholder, value, onChange }) {
  return (
    <input
      className="p-1 pl-3 mb-2 text-lg rounded-md"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
