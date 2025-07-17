import React from "react";

function SectionTitle({ title }) {
  return (
    <h1 className="pb-2 w-max mb-6 text-3xl font-medium text-center relative  before:content-[''] before:block before:bg-blue-500 before:w-20 before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2  before:h-1  ">
      {title}
    </h1>
  );
}

export default SectionTitle;
