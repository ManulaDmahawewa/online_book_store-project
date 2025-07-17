import React from "react";

function IndividualPagesHeadings({ pageHeading }) {
  return (
    <div className="flex items-center justify-center bg-blue-100 p-9">
      <h1 className="text-3xl font-semibold">{pageHeading}</h1>
    </div>
  );
}

export default IndividualPagesHeadings;
