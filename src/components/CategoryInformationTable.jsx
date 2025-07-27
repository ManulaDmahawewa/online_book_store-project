import { useEffect, useState } from "react";
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";
import { useGlobalProvider } from "../GlobalContext";
import axios from "axios";
import { Link } from "react-router";
import toast from "react-hot-toast";

function CategoryInformationTable() {
  const [categoryDetails, setCategoryDetails] = useState([]);
  const { API_URL } = useGlobalProvider();

  const GetCategoryDetails = async () => {
    try {
      const result = await axios.get(`${API_URL}/category/get/all-categories`);
      setCategoryDetails(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetCategoryDetails();
  }, []);

  const handleDelete = async (categoryID) => {
    if (categoryID) {
      try {
        const result = await axios.delete(
          `${API_URL}/category/delete/category-name/${categoryID}`
        );
        toast.success(result.data.message);
        GetCategoryDetails();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="max-h-[600px] overflow-y-auto mt-10 w-[1300px]  m-auto">
      <table className="w-full text-left table-auto ">
        <thead className="text-lg ">
          <tr>
            <th className="p-3">No</th>
            <th className="p-3">Category ID</th>
            <th className="p-3">Category Name</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody className="border-b border-blue-200 ">
          {categoryDetails.map((categoryDetail, index) => {
            return (
              <tr
                className="border-t border-blue-200 "
                key={categoryDetail.category_id}
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{categoryDetail.category_id}</td>
                <td className="p-3">
                  {categoryDetail.category_name.replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  )}
                </td>
                <td className="flex justify-start gap-3 p-3">
                  <Link
                    to={`/admin-panel/category-manegement/category-registration/${categoryDetail.category_id}`}
                  >
                    <EditButton />
                  </Link>

                  <DeleteButton
                    onClick={() => {
                      handleDelete(categoryDetail.category_id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {categoryDetails.length === 0 && (
        <div className="text-xl text-center">No data to show</div>
      )}
    </div>
  );
}

export default CategoryInformationTable;
