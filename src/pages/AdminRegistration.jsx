import AdminPanelPageHeading from "../components/Page_Headings/AdminPanelPageHeading";

const AdminRegistration = () => {
  const handleSubmit = () => {};
  return (
    <div className="p-8 ">
      <AdminPanelPageHeading title="User Registration" />
      <div className="w-2/5 m-auto rounded-lg shadow-2xl mt-14 bg-blue-50 p-14">
        <h2 className="text-4xl font-semibold text-center mb-7">
          Register New User
        </h2>
        <form className="flex flex-col px-8" onSubmit={handleSubmit}>
          <label htmlFor="name" className="mb-2 text-lg">
            Name
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="text"
            placeholder="Enter Your Name"
            required
          />

          <label htmlFor=" Email" className="mb-2 text-lg">
            Email
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="email"
            placeholder="Enter Your email"
            required
          />

          <label className="mb-2 text-lg" htmlFor=" Password">
            Password
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="password"
            placeholder="Enter Your Password"
            required
          />

          <label className="mb-2 text-lg" htmlFor="  Confirm-Password">
            Confirm-Password
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="password"
            placeholder="Confirm Your Password"
            required
          />
          <label className="mb-2 text-lg" htmlFor="role">
            User Role
          </label>
          <select name="" id="" className="p-1 pl-3 mb-2 text-lg rounded-md">
            <option value="">Main Admin</option>
            <option value="">Admin</option>
          </select>

          {/* {!isComplete && (
            <div className="text-sm text-center text-red-600 animate-pulse">
              Please Fill All Fields
            </div>
          )} */}
          <button
            type="submit"
            className="p-1 mt-5 text-lg duration-300 bg-blue-600 rounded-md hover:bg-blue-800 text-blue-50"
          >
            Register User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegistration;
