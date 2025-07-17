import { RiLogoutCircleLine } from "react-icons/ri";
import logo from "../assets/logos/logo.svg";

function AdminPageHeaderSection() {
  return (
    <header className="flex items-center justify-between p-5">
      <div>
        <img src={logo} alt="Company-logo" className="w-56 pl-5" />
      </div>
      <div className="flex items-center gap-7 mr-7">
        <span className="flex items-center justify-center w-12 h-12 text-2xl font-medium bg-blue-900 rounded-full text-blue-50">
          M
        </span>
        <p className="text-lg font-medium text-blue-950">manula@gmail.com</p>
        <span title="Logout">
          <RiLogoutCircleLine className="text-3xl" />
        </span>
      </div>
    </header>
  );
}

export default AdminPageHeaderSection;
