import AdminPanelPageHeading from "../components/Page_Headings/AdminPanelPageHeading";
import { Link } from "react-router";
import InsertButton from "../components/Buttons/InsertButton";
import AdminPanelSearchBar from "../components/AdminPanelSearchBar";
import CategoryInformationTable from "../components/CategoryInformationTable";

function CategoryManagementPage() {
  return (
    <div className="p-8 ">
      <AdminPanelPageHeading title="Book Category Management" />

      <div className="flex items-center justify-between mt-12">
        <Link to="/admin-panel/category-manegement/category-registration">
          <InsertButton button_title="New Category Registration" />
        </Link>
        <AdminPanelSearchBar placeholder="Search Category" />
      </div>
      <CategoryInformationTable />
    </div>
  );
}

export default CategoryManagementPage;
