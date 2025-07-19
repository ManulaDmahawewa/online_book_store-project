import { IoSearchSharp } from "react-icons/io5";

function AdminPanelSearchBar({ placeholder }) {
  return (
    <div>
      <label className="pr-3 text-lg font-medium">Search User :</label>
      <input
        title="Search Bar"
        type="text"
        placeholder={placeholder}
        className="p-2 rounded-md w-72"
      />
    </div>
  );
}

export default AdminPanelSearchBar;
