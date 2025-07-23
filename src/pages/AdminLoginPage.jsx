import { useNavigate } from "react-router";
import logo from "../assets/logos/logo.svg";
import axios from "axios";
import { useGlobalProvider } from "../GlobalContext";
import { useState } from "react";
import toast from "react-hot-toast";

function AdminLoginPage() {
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const navigate = useNavigate();
  const { setCurrentAdmin, API_URL } = useGlobalProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${API_URL}/admin/login`,
        { user_email, user_password },
        { withCredentials: true }
      );

      setCurrentAdmin(result.data.admin);

      toast.success(result.data.message);
      navigate("/admin-panel/dashboard");
      setUserEmail("");
      setUserPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="flex items-center justify-center w-4/5 gap-10">
        <img src={logo} alt="" />
        <div className="w-[500px] shadow-xl shadow-gray-300 border bg-blue-50 rounded-md backdrop-blur-3xl ">
          <h1 className="pb-6 text-4xl font-medium text-center pt-9">Login</h1>
          <form className="flex flex-col p-8 " onSubmit={handleSubmit}>
            <label className="mb-2 text-lg">Email</label>
            <input
              type="email"
              required
              placeholder="Enter Your Email"
              className="p-1 pl-3 mb-2 text-lg rounded-md"
              value={user_email}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />

            <label className="mb-2 text-lg">Password</label>
            <input
              type="password"
              required
              placeholder="Enter Your Password"
              className="p-1 pl-3 mb-2 text-lg rounded-md"
              value={user_password}
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
            />

            <button
              type="submit"
              className="p-1 mt-5 text-lg duration-300 bg-blue-600 rounded-md hover:bg-blue-800 text-blue-50"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
