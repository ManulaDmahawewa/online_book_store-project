import AdminPanelPageHeading from "../components/Page_Headings/AdminPanelPageHeading";
import AdminPanelSearchBar from "../components/AdminPanelSearchBar";
import InsertButton from "../components/Buttons/InsertButton";
import UserInformationTable from "../components/UserInformationTable";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalProvider } from "../GlobalContext";

function UserManagementPage() {
  const { API_URL } = useGlobalProvider();
  const [allUserDetails, setAllUserDetails] = useState([]);

  const getAllUserDetails = async () => {
    try {
      const result = await axios.get(`${API_URL}/admin/get/all-admin-details`);
      setAllUserDetails(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUserDetails();
  }, []);
  return (
    <div className="p-8 ">
      <AdminPanelPageHeading title="User Management" />

      <div className="flex items-center justify-between mt-12">
        <Link to="/admin-panel/user-manegement/admin-registration">
          <InsertButton button_title="New User Registration" />
        </Link>
        <AdminPanelSearchBar placeholder={`Search User`} />
      </div>
      <UserInformationTable
        allUserDetails={allUserDetails}
        getAllUserDetails={getAllUserDetails}
      />
    </div>
  );
}

export default UserManagementPage;
