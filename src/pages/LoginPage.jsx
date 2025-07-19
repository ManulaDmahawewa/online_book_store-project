import { useState } from "react";
import { useGlobalProvider } from "../GlobalContext";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser, API_URL } = useGlobalProvider();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${API_URL}/customer/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log(result);
      toast.success(result.data.message);
      setCurrentUser(result.data.user);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-3/5 h-[calc(100vh-118px)] m-auto ">
      <div className="w-3/4 border rounded-md shadow-xl shadow-gray-300 bg-blue-50 backdrop-blur-3xl p-14 ">
        <h2 className="text-5xl font-semibold text-center mb-7">Sign In</h2>
        <form className="flex flex-col px-8" onSubmit={handleLogin}>
          <label htmlFor="name" className="mb-2 text-lg">
            Email
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="text"
            placeholder="Enter Your email"
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
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className="p-1 mt-5 text-lg duration-300 bg-blue-600 rounded-md hover:bg-blue-800 text-blue-50"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
