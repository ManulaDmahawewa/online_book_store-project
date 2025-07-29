import { useEffect, useState } from "react";
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";
import { useGlobalProvider } from "../GlobalContext";
import axios from "axios";
import { Link } from "react-router";
import toast from "react-hot-toast";

function BooksInformationTable() {
  const [getAllBooks, setALLBooks] = useState([]);
  const { API_URL } = useGlobalProvider();

  const handleGetAllBoks = async () => {
    try {
      const result = await axios(`${API_URL}/book/get/all-books`);
      setALLBooks(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetAllBoks();
  }, []);

  const handleDelete = async (bookID) => {
    if (bookID) {
      try {
        const result = await axios.delete(
          `${API_URL}/book/delete/book-details/${bookID}`
        );
        toast.success(result.data.message);
        handleGetAllBoks();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="max-h-[600px] overflow-y-auto mt-10   ">
      <table className="w-full text-left table-auto ">
        <thead className="sticky top-0 text-lg bg-blue-100 ">
          <tr>
            <th className="p-3">No</th>
            <th className="p-3">Book ID</th>
            <th className="p-3">Book Name</th>
            <th className="p-3">Description</th>
            <th className="p-3">Image</th>
            <th className="p-3">Price</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Author</th>
            <th className="p-3">Category</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody className="border-b border-blue-200 ">
          {getAllBooks.map((book, index) => {
            return (
              <tr className="border-t border-blue-200 " key={book.book_id}>
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{book.book_id}</td>
                <td className="p-3">
                  <div className="w-48 truncate" title={book.book_name}>
                    {book.book_name.replace(/\b\w/g, (char) =>
                      char.toUpperCase()
                    )}
                  </div>
                </td>
                <td className="p-3 ">
                  <div className="w-48 truncate" title={book.book_description}>
                    {book.book_description}
                  </div>
                </td>
                <td className="p-3">
                  <img
                    src={`${API_URL}${book.book_image}`}
                    alt="book image"
                    className="w-[100px] pt-1 "
                  />
                </td>
                <td className="p-3">{book.book_price}</td>
                <td className="p-3">{book.book_qty}</td>
                <td className="p-3">{book.author_name}</td>
                <td className="p-3">{book.category_name}</td>
                <td className="p-3 ">
                  <Link
                    to={`/admin-panel/book-management/book-registration/${book.book_id}`}
                  >
                    <EditButton className="px-4 py-1 mr-3 font-medium text-purple-500 border-2 border-purple-500 rounded-md text-md hover:border-purple-700 hover:text-purple-700" />
                  </Link>
                  <DeleteButton
                    onClick={() => {
                      handleDelete(book.book_id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* {authorsDetails.length === 0 && (
        <div className="text-xl text-center">No data to show</div>
      )} */}
    </div>
  );
}

export default BooksInformationTable;
