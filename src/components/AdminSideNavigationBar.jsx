import React from "react";
import { Link } from "react-router";

function AdminSideNavigationBar() {
  return (
    <aside className="h-full pt-40 w-80">
      <Link to={"/admin-panel/dashboard"}>
        <div className="p-8 pt-5 pb-5 text-xl transition duration-200 cursor-pointer hover:bg-blue-900/50 hover:text-blue-50">
          Dashboard
        </div>
      </Link>

      <Link to={"/admin-panel/book-management"}>
        <div className="p-8 pt-5 pb-5 text-xl transition duration-200 cursor-pointer hover:bg-blue-900/50 hover:text-blue-50">
          Book Management
        </div>
      </Link>

      <Link to={"/admin-panel/author-management"}>
        <div className="p-8 pt-5 pb-5 text-xl transition duration-200 cursor-pointer hover:bg-blue-900/50 hover:text-blue-50">
          Author Management
        </div>
      </Link>

      <Link to={"/admin-panel/category-management"}>
        <div className="p-8 pt-5 pb-5 text-xl transition duration-200 cursor-pointer hover:bg-blue-900/50 hover:text-blue-50">
          Category Management
        </div>
      </Link>

      <Link to={"/admin-panel/order-management"}>
        <div className="p-8 pt-5 pb-5 text-xl transition duration-200 cursor-pointer hover:bg-blue-900/50 hover:text-blue-50">
          Order Management
        </div>
      </Link>

      <Link to={"/admin-panel/user-management"}>
        <div className="p-8 pt-5 pb-5 text-xl transition duration-200 cursor-pointer hover:bg-blue-900/50 hover:text-blue-50">
          User Management
        </div>
      </Link>
    </aside>
  );
}

export default AdminSideNavigationBar;
