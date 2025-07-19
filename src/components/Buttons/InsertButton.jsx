import React from "react";

function InsertButton({ button_title, className }) {
  return (
    <button className="p-2 pl-3 pr-3  transition duration-200 bg-blue-600 rounded-md text-md text-blue-50 hover:bg-blue-700">
      {button_title}
    </button>
  );
}

export default InsertButton;
