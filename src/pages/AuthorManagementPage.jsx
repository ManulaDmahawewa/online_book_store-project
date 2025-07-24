import React from "react";
import AdminPanelPageHeading from "../components/Page_Headings/AdminPanelPageHeading";
import { Link } from "react-router";
import InsertButton from "../components/Buttons/InsertButton";
import AdminPanelSearchBar from "../components/AdminPanelSearchBar";
import UserInformationTable from "../components/UserInformationTable";
import AuthorInformationTable from "../components/AuthorInformationTable";

function AuthorManagementPage() {
  return (
    <div className="p-8 ">
      <AdminPanelPageHeading title="Author Management" />

      <div className="flex items-center justify-between mt-12">
        <Link to="/admin-panel/user-manegement/author-registration">
          <InsertButton button_title="New Author Registration" />
        </Link>
        <AdminPanelSearchBar placeholder="Search Author" />
      </div>
      <AuthorInformationTable />
    </div>
  );
}

export default AuthorManagementPage;
