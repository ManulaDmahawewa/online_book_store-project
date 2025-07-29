function FormBody({
  formTitle,
  children,
  onSubmit,
  className = "w-2/5 m-auto rounded-lg shadow-2xl mt-14 bg-blue-50 p-14",
}) {
  return (
    <div className={className}>
      <h2 className="text-4xl font-semibold text-center mb-7">{formTitle}</h2>
      <form onSubmit={onSubmit} className="flex flex-col px-8">
        {children}
      </form>
    </div>
  );
}

export default FormBody;
