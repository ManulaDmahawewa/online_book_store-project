import AdminPanelPageHeading from "../components/Page_Headings/AdminPanelPageHeading";
import AdminPanelSearchBar from "../components/AdminPanelSearchBar";
import InsertButton from "../components/Buttons/InsertButton";
import UserInformationTable from "../components/UserInformationTable";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router";

function UserManagementPage() {
  return (
    <div className="p-8 ">
      <AdminPanelPageHeading title="User Management" />

      <div className="flex items-center justify-between mt-12">
        <Link to="/admin-panel/user-manegement/admin-registration">
          <InsertButton button_title="New User Registration" />
        </Link>
        <AdminPanelSearchBar placeholder={`Search User`} />
      </div>
      <UserInformationTable />
    </div>
  );
}

export default UserManagementPage;
