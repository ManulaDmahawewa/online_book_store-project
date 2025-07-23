import React from "react";

function DeleteButton({ onClick }) {
  return (
    <button
      className="px-4 py-1 font-medium text-red-500 border-2 border-red-500 rounded-md text-md hover:border-red-600 hover:text-red-600"
      onClick={onClick}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
