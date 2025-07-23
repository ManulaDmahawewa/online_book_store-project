import { RiLogoutCircleLine } from "react-icons/ri";
import logo from "../assets/logos/logo.svg";
import { useGlobalProvider } from "../GlobalContext";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function AdminPageHeaderSection() {
  const { currentAdmin, API_URL } = useGlobalProvider();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.post(
        `${API_URL}/admin/logout`,
        {},
        { withCredentials: true }
      );
      toast.success(result.data.message);
      navigate("/admin/login");
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <header className="flex items-center justify-between p-5">
      <div>
        <img src={logo} alt="Company-logo" className="w-56 pl-5" />
      </div>
      <div className="flex items-center gap-7 mr-7">
        {currentAdmin && (
          <span className="flex items-center justify-center w-12 h-12 text-2xl font-medium bg-blue-900 rounded-full text-blue-50">
            {currentAdmin.email[0].toUpperCase()}
          </span>
        )}
        {currentAdmin && (
          <p className="text-lg font-medium text-blue-950">
            {currentAdmin.email}
          </p>
        )}
        <span title="Logout" onClick={handleLogout}>
          <RiLogoutCircleLine className="text-3xl cursor-pointer" />
        </span>
      </div>
    </header>
  );
}

export default AdminPageHeaderSection;
