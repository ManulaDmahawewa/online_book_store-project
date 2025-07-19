import logo from "../assets/logos/logo.svg";
import { IoMdHome, IoMdSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { Link, useNavigate } from "react-router";
import { useGlobalProvider } from "../GlobalContext";
import axios from "axios";
import toast from "react-hot-toast";

function NavigationBar() {
  const { currentUser, setCurrentUser, API_URL } = useGlobalProvider();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (currentUser) {
      try {
        axios.post(`${API_URL}/customer/logout`, {}, { withCredentials: true });
        setCurrentUser("");
        toast.success("Successfuly logout");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="sticky top-0 z-50 border-b-2 bg-blue-50">
      <nav className="relative flex items-center justify-between w-3/5 m-auto ">
        <img src={logo} alt="company-logo" className="w-72" />
        <Link to="/">
          <IoMdHome
            fill="#292524"
            className="text-4xl duration-500 cursor-pointer hover:fill-blue-800"
            title="go to home page"
          />
        </Link>
        <input
          type="search"
          placeholder="Search Books"
          className="pl-4 rounded-l-lg w-96 h-11"
        />
        <label
          htmlFor="search-bar"
          className="flex items-center px-2 text-4xl duration-500 bg-blue-500 rounded-r-lg cursor-pointer -translate-x-7 h-11 hover:bg-blue-600"
        >
          <IoMdSearch className=" fill-black" />
        </label>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center justify-center text-2xl font-semibold bg-blue-800 rounded-full text-blue-50 w-11 h-11">
              {currentUser.email[0].toUpperCase()}
            </div>
          ) : (
            <Link to="/sign-in">
              <FaRegUser
                fill="#292524"
                className="text-3xl duration-500 cursor-pointer hover:fill-blue-800 "
              />
            </Link>
          )}
          <div className="flex flex-col w-[265px]">
            {currentUser ? (
              <label
                htmlFor="sign in"
                className="font-medium text-blue-800 duration-500 cursor-pointer"
              >
                {currentUser.email}
              </label>
            ) : (
              <Link to="/sign-in">
                <label
                  htmlFor="sign in"
                  className="duration-500 cursor-pointer hover:text-blue-800"
                >
                  Sign in
                </label>
              </Link>
            )}

            {currentUser ? (
              <label
                htmlFor="create account"
                className="text-blue-800 duration-500 cursor-pointer hover:text-blue-950"
                onClick={handleLogout}
              >
                Logout
              </label>
            ) : (
              <Link to="/registration">
                <label
                  htmlFor="create account"
                  className="duration-500 cursor-pointer hover:text-blue-800"
                >
                  Create An Account
                </label>
              </Link>
            )}
          </div>
        </div>

        <div className="relative flex gap-3">
          <Link to="/my-cart">
            <BsCart
              fill="#292524"
              className="text-3xl duration-500 cursor-pointer hover:fill-blue-800"
            />
          </Link>
          <label
            htmlFor="number of cart items "
            className="absolute flex items-center justify-center w-2 h-2 p-3 text-xs font-bold bg-blue-800 rounded-full -right-3 -top-3 text-blue-50"
          >
            0
          </label>
        </div>

        <div className="absolute top-[82px] left-[33%] w-[423px] bg-zinc-50 h-36 z-30  drop-shadow-lg hidden"></div>
      </nav>
    </div>
  );
}

export default NavigationBar;
