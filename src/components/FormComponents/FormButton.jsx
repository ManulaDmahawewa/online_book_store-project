function FormButton({ type, btnName }) {
  return (
    <button
      className="p-1 mt-5 text-lg duration-300 bg-blue-600 rounded-md hover:bg-blue-800 text-blue-50"
      type={type}
    >
      {btnName}
    </button>
  );
}

export default FormButton;
