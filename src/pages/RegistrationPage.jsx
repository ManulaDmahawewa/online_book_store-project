import React from "react";

function RegistrationPage() {
  return (
    <div className="flex items-center justify-center w-3/5 h-[calc(100vh-118px)] m-auto ">
      <div className="w-3/4 rounded-lg shadow-2xl bg-zinc-100 p-14 ">
        <h2 className="text-5xl font-semibold text-center mb-7">
          Create New Account
        </h2>
        <form className="flex flex-col px-8">
          <label htmlFor="name" className="mb-2 text-lg">
            Name
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="text"
            placeholder="Enter Your Name"
          />

          <label htmlFor="name" className="mb-2 text-lg">
            Email
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="text"
            placeholder="Enter Your email"
          />

          <label className="mb-2 text-lg" htmlFor="name">
            Password
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="password"
            placeholder="Enter Your Password"
          />

          <label className="mb-2 text-lg" htmlFor="name">
            Confirm-Password
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="password"
            placeholder="Confirm Your Password"
          />

          <label className="mb-2 text-lg" htmlFor="name">
            Contact Number
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="text"
            placeholder="Enter Your Contact Number"
          />

          <label className="mb-2 text-lg" htmlFor="name">
            Delivery Address
          </label>
          <textarea
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="text"
            placeholder="Enter Your Delivery Address"
          />
          <button className="p-1 mt-5 text-lg duration-300 bg-blue-600 rounded-md hover:bg-blue-800 text-blue-50">
            Create An Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
