import React from "react";

function EditButton({
  className = "px-4 py-1 font-medium text-purple-500 border-2 border-purple-500 rounded-md text-md hover:border-purple-700 hover:text-purple-700",
}) {
  return <button className={className}>Edit</button>;
}

export default EditButton;
