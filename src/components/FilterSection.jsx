import { useState } from "react";

function FilterSection() {
  const [priceRange, setPriceRange] = useState(0);
  return (
    <div className="flex items-center justify-between gap-3 p-5">
      <div className="flex items-center gap-3">
        <label className="font-medium">Filter By Price :</label>
        <input
          id="range"
          className="w-56 border-blue-500"
          type="range"
          min={0}
          max={5000}
          value={priceRange}
          onChange={(e) => {
            setPriceRange(e.target.value);
          }}
        />
        <span className="font-medium">Price: RS. {priceRange}</span>
      </div>
      <div className="flex items-center gap-3">
        <label className="font-medium">Filter By Author :</label>
        <select className="w-64 p-1">
          <option value="">Select Author</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSection;
