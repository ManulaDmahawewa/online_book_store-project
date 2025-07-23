import { useEffect, useState } from "react";
import AdminPanelPageHeading from "../components/Page_Headings/AdminPanelPageHeading";
import toast from "react-hot-toast";
import axios from "axios";
import { useGlobalProvider } from "../GlobalContext";
import { useNavigate, useParams } from "react-router";

const AdminRegistration = () => {
  const [user_name, setUserName] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user_role, setUserRole] = useState("");
  const [isComplete, setIsComplete] = useState(true);
  const { API_URL } = useGlobalProvider();
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      user_name &&
      user_email &&
      user_password &&
      confirmPassword &&
      user_role
    ) {
      setIsComplete(true);
    }
  }, [user_name, user_email, user_password, confirmPassword, user_role]);

  useEffect(() => {
    if (param.id) {
      const getUserDetails = async () => {
        try {
          const result = await axios.get(
            `${API_URL}/admin/get/admin-details/${param.id}`
          );
          const data = result.data;
          setUserName(data.user_name);
          setUserEmail(data.user_email);
          setUserRole(data.user_role);
        } catch (error) {
          console.error(error);
        }
      };
      getUserDetails();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user_password !== confirmPassword) {
      return toast.error("Incorrect Confirm Password");
    }
    if (
      !user_name ||
      !user_email ||
      !user_password ||
      !confirmPassword ||
      !user_role
    ) {
      return setIsComplete(false);
    }

    try {
      const result = await axios.post(`${API_URL}/admin/registration`, {
        user_name,
        user_email,
        user_password,
        confirmPassword,
        user_role,
      });
      toast.success(result.data.message);
      navigate("/admin-panel/user-management");
      setUserName("");
      setUserEmail("");
      setUserPassword("");
      setConfirmPassword("");
      setUserRole("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("Edit handler triggered"); // <--- Add this
    if (param.id) {
      try {
        const result = await axios.put(
          `${API_URL}/admin/update/admin-details/${param.id}`,
          {
            user_name,
            user_email,
            user_role,
          }
        );
        console.log(result);

        toast.success(result.data.message);
        navigate("/admin-panel/user-management");
      } catch (error) {
        console.log("Edit error:", error);
      }
    }
  };

  return (
    <div className="p-8 ">
      {param.id ? (
        <AdminPanelPageHeading title="Update User Information" />
      ) : (
        <AdminPanelPageHeading title="User Registration" />
      )}
      <div className="w-2/5 m-auto rounded-lg shadow-2xl mt-14 bg-blue-50 p-14">
        <h2 className="text-4xl font-semibold text-center mb-7">
          {param.id ? "Edit User" : "Register New User"}
        </h2>
        <form className="flex flex-col px-8">
          <label htmlFor="name" className="mb-2 text-lg">
            Name
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="text"
            placeholder="Enter Your Name"
            value={user_name}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />

          <label htmlFor=" Email" className="mb-2 text-lg">
            Email
          </label>
          <input
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            type="email"
            placeholder="Enter Your email"
            value={user_email}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />

          {!param.id && (
            <>
              <label className="mb-2 text-lg" htmlFor=" Password">
                Password
              </label>
              <input
                className="p-1 pl-3 mb-2 text-lg rounded-md"
                type="password"
                placeholder="Enter Your Password"
                value={user_password}
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />

              <label className="mb-2 text-lg" htmlFor="  Confirm-Password">
                Confirm-Password
              </label>
              <input
                className="p-1 pl-3 mb-2 text-lg rounded-md"
                type="password"
                placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </>
          )}
          <label className="mb-2 text-lg" htmlFor="role">
            User Role
          </label>
          <select
            id="userRole"
            className="p-1 pl-3 mb-2 text-lg rounded-md"
            value={user_role}
            onChange={(e) => {
              setUserRole(e.target.value);
            }}
          >
            <option value="">
              ----------------------Select Role-------------------------------
            </option>
            <option value="Main Admin">Main Admin</option>
            <option value="Admin">Admin</option>
          </select>

          {!isComplete && (
            <div className="text-sm text-center text-red-600 animate-pulse">
              Please Fill All Fields
            </div>
          )}

          {param.id ? (
            <button
              type="submit"
              onClick={handleEdit}
              className="p-1 mt-5 text-lg duration-300 bg-blue-600 rounded-md hover:bg-blue-800 text-blue-50"
            >
              Edit User
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="p-1 mt-5 text-lg duration-300 bg-blue-600 rounded-md hover:bg-blue-800 text-blue-50"
            >
              Register User
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminRegistration;
