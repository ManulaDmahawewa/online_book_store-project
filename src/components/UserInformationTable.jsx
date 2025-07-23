import React, { useEffect } from "react";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";
import { Link } from "react-router";
import axios from "axios";
import { useGlobalProvider } from "../GlobalContext";
import toast from "react-hot-toast";

function UserInformationTable({ allUserDetails, getAllUserDetails }) {
  const { API_URL } = useGlobalProvider();

  useEffect(() => {
    console.log("Refresh user details table");
  }, [allUserDetails]);

  const handleDelete = async (userId) => {
    if (userId) {
      try {
        const result = await axios.delete(
          `${API_URL}/admin/delete/admin-details/${userId}`
        );
        toast.success(result.data.message);
        await getAllUserDetails();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="max-h-[600px] overflow-y-auto mt-10   ">
      <table className="w-full text-left table-auto ">
        <thead className="text-lg ">
          <tr>
            <th className="p-3">No</th>
            <th className="p-3">User ID</th>
            <th className="p-3">User Name</th>
            <th className="p-3">User Email</th>
            <th className="p-3">User Role</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody className="border-b border-blue-200 ">
          {allUserDetails.map((UserDetail, index) => {
            return (
              <tr
                className="border-t border-blue-200 "
                key={UserDetail.user_id}
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{UserDetail.user_id}</td>
                <td className="p-3">
                  {UserDetail.user_name.replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  )}
                </td>
                <td className="p-3">{UserDetail.user_email}</td>
                <td className="p-3">{UserDetail.user_role}</td>
                <td className="flex justify-start gap-3 p-3">
                  <Link
                    to={`/admin-panel/user-manegement/admin-registration/${UserDetail.user_id}`}
                  >
                    <EditButton />
                  </Link>
                  <DeleteButton
                    onClick={() => {
                      handleDelete(UserDetail.user_id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserInformationTable;
