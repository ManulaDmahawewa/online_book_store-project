import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalProvider } from "../GlobalContext";
import { Link } from "react-router";
import toast from "react-hot-toast";

function AuthorInformationTable() {
  const [authorsDetails, setAuthorsDetails] = useState([]);
  const { API_URL } = useGlobalProvider();

  //----------------get all author details----------------------

  const getAuthorDetails = async () => {
    try {
      const result = await axios.get(
        `${API_URL}/author/get/all-author-details`
      );
      setAuthorsDetails(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAuthorDetails();
  }, [authorsDetails]);

  //----------------------delete author details-----------------------

  const handleDeleteAuthor = async (authorID) => {
    if (authorID) {
      try {
        const result = await axios.delete(
          `${API_URL}/author/delete/author-details/${authorID}`
        );
        toast.success(result.data.message);
        await getAuthorDetails();
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
            <th className="p-3">Author ID</th>
            <th className="p-3">Author Name</th>
            <th className="p-3">Author Bio</th>
            <th className="p-3">Author Country</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody className="border-b border-blue-200 ">
          {authorsDetails.map((authorsDetail, index) => {
            return (
              <tr
                className="border-t border-blue-200 "
                key={authorsDetail.author_id}
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{authorsDetail.author_id}</td>
                <td className="p-3">{authorsDetail.author_name}</td>
                <td className="p-3 ">
                  <div
                    className="truncate w-96"
                    title={authorsDetail.author_bio}
                  >
                    {authorsDetail.author_bio}
                  </div>
                </td>
                <td className="p-3">{authorsDetail.author_country}</td>
                <td className="flex justify-start gap-3 p-3">
                  <Link
                    to={`/admin-panel/user-manegement/author-registration/${authorsDetail.author_id}`}
                  >
                    <EditButton />
                  </Link>
                  <DeleteButton
                    onClick={() => {
                      handleDeleteAuthor(authorsDetail.author_id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {authorsDetails.length === 0 && (
        <div className="text-xl text-center">No data to show</div>
      )}
    </div>
  );
}

export default AuthorInformationTable;
