import React from "react";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";

function UserInformationTable() {
  return (
    <div className="max-h-[600px] overflow-y-auto mt-10   ">
      <table className="w-full text-left table-auto ">
        <thead className="text-lg ">
          <tr>
            <th className="p-3">User ID</th>
            <th className="p-3">User Name</th>
            <th className="p-3">User Email</th>
            <th className="p-3">User Role</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody className="border-b border-blue-200 ">
          <tr className="border-t border-blue-200 ">
            <td className="p-3">1</td>
            <td className="p-3">Malcolm Lockyer</td>
            <td className="p-3">malcom@bookhaven.com</td>
            <td className="p-3">Admin</td>
            <td className="flex justify-start gap-3 p-3">
              <EditButton />
              <DeleteButton />
            </td>
          </tr>
          <tr className="border-t border-blue-200 ">
            <td className="p-3">1</td>
            <td className="p-3">Malcolm Lockyer</td>
            <td className="p-3">malcom@bookhaven.com</td>
            <td className="p-3">Admin</td>
            <td className="p-3">Admin</td>
          </tr>
          <tr className="border-t border-blue-200 ">
            <td className="p-3">1</td>
            <td className="p-3">Malcolm Lockyer</td>
            <td className="p-3">malcom@bookhaven.com</td>
            <td className="p-3">Admin</td>
            <td className="p-3">Admin</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserInformationTable;
