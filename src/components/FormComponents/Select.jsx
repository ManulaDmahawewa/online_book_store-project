function Select({
  value,
  onChange,
  defaultValue,
  mapingArray,
  optionId,
  optionName,
}) {
  return (
    <select
      className="p-1 pl-3 mb-2 text-lg rounded-md"
      value={value}
      onChange={onChange}
    >
      <option value="">{defaultValue}</option>
      {mapingArray.map((data) => {
        return (
          <option id={data[optionId]} value={data[optionId]}>
            {data[optionName]}
          </option>
        );
      })}
    </select>
  );
}

export default Select;
