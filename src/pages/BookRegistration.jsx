import React, { useEffect, useState } from "react";
import AdminPanelPageHeading from "../components/Page_Headings/AdminPanelPageHeading";
import FormBody from "../components/FormComponents/FormBody";
import Label from "../components/FormComponents/label";
import Input from "../components/FormComponents/input";
import TextArea from "../components/FormComponents/TextArea";
import ValidationContainer from "../components/FormComponents/ValidationContainer";
import FormButton from "../components/FormComponents/Formbutton";
import Select from "../components/FormComponents/Select";
import axios from "axios";
import { useGlobalProvider } from "../GlobalContext";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

function BookRegistration() {
  const [authorList, setAuthorList] = useState([]);
  const [categoryList, setCaegoryList] = useState([]);
  const [book_name, setBookName] = useState("");
  const [book_description, setBookDescription] = useState("");
  const [book_image, setBookImage] = useState("");
  const [book_price, setBookPrice] = useState("");
  const [book_qty, setBookQty] = useState("");
  const [author_id, setAuthorId] = useState("");
  const [category_id, setCategoryId] = useState("");
  const { API_URL } = useGlobalProvider();
  const [isComplete, setIsComplete] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      book_name &&
      book_description &&
      book_image &&
      book_price &&
      book_qty &&
      author_id &&
      category_id
    ) {
      setIsComplete(true);
    }
  }, [
    book_name,
    book_description,
    book_image,
    book_price,
    book_qty,
    author_id,
    category_id,
  ]);

  const getAuthors = async () => {
    try {
      const result = await axios.get(
        `${API_URL}/author/get/all-author-details`
      );
      setAuthorList(result.data);
    } catch (error) {}
  };

  const getCategories = async () => {
    try {
      const result = await axios.get(`${API_URL}/category/get/all-categories`);
      setCaegoryList(result.data);
    } catch (error) {}
  };

  const getIndividualBookDetails = async () => {
    if (params.id) {
      try {
        const result = await axios(
          `${API_URL}/book/get/individual-book/${params.id}`
        );
        setBookName(result.data.book_name);
        setBookDescription(result.data.book_description);
        setAuthorId(result.data.author_id);
        setCategoryId(result.data.category_id);
        setBookPrice(result.data.book_price);
        setBookQty(result.data.book_qty);
        setBookImage(result.data.book_image);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getAuthors();
    getCategories();
    getIndividualBookDetails();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const result = await axios.post(`${API_URL}/upload`, formData);
    console.log(result);
    setBookImage(result.data.path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !book_name ||
      !book_description ||
      !book_image ||
      !book_price ||
      !book_qty ||
      !author_id ||
      !category_id
    ) {
      return setIsComplete(false);
    }
    try {
      const result = await axios.post(`${API_URL}/book/insert-book-details`, {
        book_name,
        book_description,
        book_image,
        book_price,
        book_qty,
        author_id,
        category_id,
      });
      toast.success(result.data.message);
      setBookName("");
      setBookDescription("");
      setAuthorId("");
      setCategoryId("");
      setBookPrice("");
      setBookQty("");
      setBookImage("");
      navigate("/admin-panel/book-management");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (
      !book_name ||
      !book_description ||
      !book_image ||
      !book_price ||
      !book_qty ||
      !author_id ||
      !category_id
    ) {
      return setIsComplete(false);
    }
    try {
      const result = await axios.put(
        `${API_URL}/book/update/book-details/${params.id}`,
        {
          book_name,
          book_description,
          book_image,
          book_price,
          book_qty,
          author_id,
          category_id,
        }
      );
      toast.success(result.data.message);
      navigate("/admin-panel/book-management");
    } catch (error) {
      if (error.response.status === 400) {
        return toast.error(error.response.data.message);
      }
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <AdminPanelPageHeading
        title={!params.id ? "Book Registration" : "Update Book Details"}
      />
      <FormBody
        formTitle={!params.id ? "Register New Book" : "Edit Book Details"}
        className="w-2/3 m-auto rounded-lg shadow-2xl mt-14 bg-blue-50 p-14"
        onSubmit={!params.id ? handleSubmit : handleEdit}
      >
        <div className="flex w-full gap-3">
          <div className="flex flex-col w-1/2">
            <Label label="Book Name" />
            <Input
              type="text"
              placeholder="Enter Book Name"
              value={book_name}
              onChange={(e) => {
                setBookName(e.target.value);
              }}
            />

            <Label label="Book Description" />
            <TextArea
              type="text"
              placeholder="Enter Book Description"
              value={book_description}
              onChange={(e) => {
                setBookDescription(e.target.value);
              }}
            />

            <Label label="Author" />
            <Select
              mapingArray={authorList}
              optionId="author_id"
              optionName="author_name"
              defaultValue="----------------Select Author------------------"
              value={author_id}
              onChange={(e) => {
                setAuthorId(e.target.value);
              }}
            />

            <Label label="Category" />
            <Select
              mapingArray={categoryList}
              defaultValue="----------------Select Category-----------------"
              optionId="category_id"
              optionName="category_name"
              value={category_id}
              onChange={(e) => {
                setCategoryId(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col w-1/2">
            <div className="flex gap-3">
              <div className="flex flex-col w-1/3">
                <Label label="Price" />
                <Input
                  type="text"
                  placeholder="Enter Price"
                  value={book_price}
                  onChange={(e) => {
                    setBookPrice(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col w-2/3">
                <Label label="Quantity" />
                <Input
                  type="text"
                  placeholder="Enter Quantity"
                  value={book_qty}
                  onChange={(e) => {
                    setBookQty(e.target.value);
                  }}
                />
              </div>
            </div>
            <Label label="Book Image" />
            <Input type="file" accept="image/*" onChange={handleUpload} />
            <div className="flex justify-center w-full">
              {book_image && (
                <img
                  src={`${API_URL}${book_image}`}
                  alt="book image"
                  className="w-[120px] pt-1 "
                />
              )}
            </div>
          </div>
        </div>

        {!isComplete && <ValidationContainer />}

        <FormButton
          btnName={!params.id ? "Register Book" : "Edit Book Details"}
          type="submit"
        />
      </FormBody>
    </div>
  );
}

export default BookRegistration;
