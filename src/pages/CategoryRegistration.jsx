import React, { useEffect, useState } from "react";
import FormBody from "../components/FormComponents/FormBody";
import AdminPanelPageHeading from "../components/Page_Headings/AdminPanelPageHeading";
import Label from "../components/FormComponents/label";
import Input from "../components/FormComponents/input";
import FormButton from "../components/FormComponents/Formbutton";
import { useGlobalProvider } from "../GlobalContext";
import ValidationContainer from "../components/FormComponents/ValidationContainer";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

function CategoryRegistration() {
  const [category_name, setCategoryName] = useState("");
  const [isComplete, setIsComplete] = useState(true);
  const { API_URL } = useGlobalProvider();
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    const getIndividualCategory = async () => {
      try {
        const result = await axios.get(
          `${API_URL}/category/get/individual-category/${param.id}`
        );
        console.log(result);
        setCategoryName(result.data.category_name);
      } catch (error) {
        console.error(error);
      }
    };
    getIndividualCategory();
  }, []);

  useEffect(() => {
    if (category_name) {
      setIsComplete(true);
    }
  }, [category_name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category_name) {
      return setIsComplete(false);
    }
    try {
      const result = await axios.post(`${API_URL}/category/insert-category`, {
        category_name,
      });
      toast.success(result.data.message);
      setCategoryName("");
      navigate("/admin-panel/category-management");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!category_name) {
      return setIsComplete(false);
    }
    try {
      const result = await axios.put(
        `${API_URL}/category/update/category-name/${param.id}`,
        { category_name }
      );
      toast.success(result.data.message);
      navigate("/admin-panel/category-management");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <AdminPanelPageHeading
        title={
          !param.id ? "Book Category Registration" : "Update Book Category"
        }
      />
      <FormBody
        formTitle={!param.id ? "Register New Category" : "Edit Category"}
        onSubmit={!param.id ? handleSubmit : handleEdit}
      >
        <Label label="Category Name" />
        <Input
          type="text"
          placeholder="Enter Category Name"
          value={category_name}
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
        />
        {!isComplete && <ValidationContainer />}
        <FormButton
          btnName={!param.id ? "Register Category" : "Edit Category"}
          type="submit"
        />
      </FormBody>
    </div>
  );
}

export default CategoryRegistration;
