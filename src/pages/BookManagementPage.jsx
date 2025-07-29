import React from "react";
import AdminPanelPageHeading from "../components/Page_Headings/AdminPanelPageHeading";
import { Link } from "react-router";
import InsertButton from "../components/Buttons/InsertButton";
import AdminPanelSearchBar from "../components/AdminPanelSearchBar";
import AuthorInformationTable from "../components/AuthorInformationTable";
import BooksInformationTable from "../components/BooksInformationTable";

function BookManagementPage() {
  return (
    <div className="p-8">
      <AdminPanelPageHeading title="Book Management" />

      <div className="flex items-center justify-between mt-12">
        <Link to="/admin-panel/book-management/book-registration">
          <InsertButton button_title="New Book Registration" />
        </Link>
        <AdminPanelSearchBar placeholder="Search Book" />
      </div>
      <BooksInformationTable />
    </div>
  );
}

export default BookManagementPage;
