import logo from "../assets/logos/logo.svg";
import { IoMdHome, IoMdSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router";

function NavigationBar() {
  return (
    <div className="relative border-b-2">
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
          <Link to="/sign-in">
            <FaRegUser
              fill="#292524"
              className="text-3xl duration-500 cursor-pointer hover:fill-blue-800 "
            />
          </Link>
          <div className="flex flex-col ">
            <Link to="/sign-in">
              <label
                htmlFor="sign in"
                className="duration-500 cursor-pointer hover:text-blue-800"
              >
                Sign in
              </label>
            </Link>
            <Link to="/registration">
              <label
                htmlFor="create account"
                className="duration-500 cursor-pointer hover:text-blue-800"
              >
                Create An Account
              </label>
            </Link>
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
