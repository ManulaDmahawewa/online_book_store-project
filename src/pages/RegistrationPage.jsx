import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useGlobalProvider } from "../GlobalContext";
import { useNavigate } from "react-router";

function RegistrationPage() {
  const [customer_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact_no, setContactNo] = useState("");
  const [delivery_address, setDeliveryAddress] = useState("");
  const [isComplete, setIsComplete] = useState(true);
  const { setCurrentUser, API_URL } = useGlobalProvider();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Incorrect confirm password");
    }
    if (
      customer_name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0 ||
      contact_no.length === 0 ||
      delivery_address.length === 0
    ) {
      return setIsComplete(false);
    } else {
      setIsComplete(true);
    }
    try {
      const result = await axios.post(
        `${API_URL}/customer/registration`,
        {
          customer_name,
          email,
          contact_no,
          delivery_address,
          password,
        },
        { withCredentials: true }
      );
      setCurrentUser(result.data.user);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setContactNo("");
      setDeliveryAddress("");
      toast.success("Registration Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-3/5 h-[calc(100vh-118px)] m-auto ">
      <div className="w-3/4 rounded-lg shadow-2xl bg-zinc-100 p-14 ">
        <h2 className="text-5xl font-semibold text-center mb-7">
          Create New Account
        </h2>
        <form className="flex flex-col px-8" onSubmit={handleSubmit}>
          <label htmlFor="name" className="mb-2 text-lg">
            Name
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="text"
            placeholder="Enter Your Name"
            value={customer_name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <label htmlFor="name" className="mb-2 text-lg">
            Email
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="email"
            placeholder="Enter Your email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label className="mb-2 text-lg" htmlFor="name">
            Password
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="password"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <label className="mb-2 text-lg" htmlFor="name">
            Confirm-Password
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="password"
            placeholder="Confirm Your Password"
            required
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />

          <label className="mb-2 text-lg" htmlFor="name">
            Contact Number
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="tel"
            placeholder="Enter Your Contact Number"
            required
            value={contact_no}
            onChange={(e) => {
              setContactNo(e.target.value);
            }}
          />

          <label className="mb-2 text-lg" htmlFor="name">
            Delivery Address
          </label>
          <textarea
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            placeholder="Enter Your Delivery Address"
            required
            value={delivery_address}
            onChange={(e) => {
              setDeliveryAddress(e.target.value);
            }}
          />
          {!isComplete && (
            <div className="text-sm text-center text-red-600 animate-pulse">
              Please Fill All Fields
            </div>
          )}
          <button
            type="submit"
            className="p-1 mt-5 text-lg duration-300 bg-blue-600 rounded-md hover:bg-blue-800 text-blue-50"
          >
            Create An Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
