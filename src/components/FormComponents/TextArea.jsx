import React from "react";

function TextArea({ placeholder, value, onChange }) {
  return (
    <textarea
      className="p-1 pl-3 mb-2 text-lg rounded-md"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextArea;
