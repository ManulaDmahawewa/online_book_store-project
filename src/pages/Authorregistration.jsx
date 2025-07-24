import AdminPanelPageHeading from "../components/Page_Headings/AdminPanelPageHeading";
import FormBody from "../components/FormComponents/FormBody";
import Label from "../components/FormComponents/label";
import Input from "../components/FormComponents/input";
import TextArea from "../components/FormComponents/TextArea";
import FormButton from "../components/FormComponents/Formbutton";
import { useEffect, useState } from "react";
import ValidationContainer from "../components/FormComponents/ValidationContainer";
import axios from "axios";
import { useGlobalProvider } from "../GlobalContext";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

function Authorregistration() {
  const [author_name, setAuthorName] = useState("");
  const [author_bio, setAuthorBio] = useState("");
  const [author_country, setAuthorCountry] = useState("");
  const [isComplete, setIsComplete] = useState(true);
  const { API_URL } = useGlobalProvider();
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (author_name && author_bio && author_country) {
      return setIsComplete(true);
    }
  }, [author_name, author_bio, author_country]);

  //----------------register new author-------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author_name || !author_bio || !author_country) {
      return setIsComplete(false);
    }
    try {
      const result = await axios.post(`${API_URL}/author/insert-author`, {
        author_name,
        author_bio,
        author_country,
      });
      toast.success(result.data.message);
      setAuthorName("");
      setAuthorBio("");
      setAuthorCountry("");
      navigate("/admin-panel/author-management");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  //---------------get individualauthor details-----------------------

  useEffect(() => {
    if (param.id) {
      try {
        const getIndividualAuthorDetails = async () => {
          const result = await axios.get(
            `${API_URL}/author/get/individual-author-details/${param.id}`
          );
          const AuthorData = result.data;
          setAuthorName(AuthorData.author_name);
          setAuthorBio(AuthorData.author_bio);
          setAuthorCountry(AuthorData.author_country);
        };
        getIndividualAuthorDetails();
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  //-----------------------------edit author details-----------------------------

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      if (param.id) {
        const result = await axios.put(
          `${API_URL}/author/update/author-details/${param.id}`,
          { author_name, author_bio, author_country }
        );
        toast.success(result.data.message);
        navigate("/admin-panel/author-management");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <AdminPanelPageHeading
        title={!param.id ? "Author Registration" : "Update Author Information"}
      />
      <FormBody
        formTitle={!param.id ? "Register New Author" : "Edit Author "}
        onSubmit={!param.id ? handleSubmit : handleEdit}
      >
        <Label label="Author Name" />
        <Input
          type="text"
          placeholder="Enter Author Name"
          value={author_name}
          onChange={(e) => {
            setAuthorName(e.target.value);
          }}
        />

        <Label label="Author Bio" />
        <TextArea
          type="text"
          placeholder="Enter Description About Author"
          value={author_bio}
          onChange={(e) => {
            setAuthorBio(e.target.value);
          }}
        />

        <Label label="Author Country" />
        <Input
          type="text"
          placeholder="Enter Country Of Author"
          value={author_country}
          onChange={(e) => {
            setAuthorCountry(e.target.value);
          }}
        />

        {!isComplete && <ValidationContainer />}

        <FormButton
          btnName={!param.id ? "Register Author" : "Edit Author"}
          type="submit"
        />
      </FormBody>
    </div>
  );
}

export default Authorregistration;
