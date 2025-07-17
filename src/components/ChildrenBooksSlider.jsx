import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Slider from "react-slick";
import { Book } from "./tempary";
import SectionTitle from "./SectionTitle";
import { GrNext, GrPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router";

function ChildrenBooksSlider() {
  const NextArrow = ({ onClick }) => {
    return (
      <button
        className="absolute right-0 opacity-50 hover:opacity-100 z-10 p-2 text-2xl text-white transform -translate-x-[24px] -translate-y-1/2 rounded-s-full bg-gray-500/50 top-1/3"
        onClick={onClick}
      >
        <GrNext />
      </button>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <button
        className="absolute left-0 opacity-50 hover:opacity-100 z-10 p-2 text-2xl text-white transform translate-x-[18px] -translate-y-1/2 rounded-e-full bg-gray-500/50 top-1/3"
        onClick={onClick}
      >
        <GrPrevious />
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div id="book-sliser-main" className="mt-6">
      <div className="relative flex justify-center ">
        <SectionTitle title="Children" />
        <Link to={"children"}>
          <span className="absolute right-0 flex items-center font-semibold cursor-pointer bottom-3 hover:text-blue-500">
            EXPLORE ALL <MdNavigateNext className="text-lg font-semibold " />
            <MdNavigateNext className="text-lg font-semibold transform -translate-x-1/2 " />
          </span>
        </Link>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {Book.map((item) => {
            return (
              <div key={item.id} className="relative cursor-pointer h-96 ">
                <div className="w-[190px] flex justify-center">
                  <div className=" relative w-[170px]   p-2  translate-y-3">
                    <img className=" h-56 w-[170px] pb-2" src={item.image} />
                    <div className="h-12 ">
                      <h4 className="w-full font-medium text-blue-800 break-words text-md">
                        {item.name}
                      </h4>
                    </div>
                    <p className="pt-2 text-lg font-medium text-red-700">
                      Rs. {item.price}
                    </p>
                  </div>
                </div>
                <div className="translate-y-3  rounded-sm flex opacity-0 items-end justify-evenly pb-2 w-[190px] transition duration-300 m-auto h-[370px] absolute top-0 left-0 hover:border hover:border-blue-100 hover:shadow-md hover:opacity-100 hover:translate-y-0 ">
                  <label className="flex items-center gap-1 font-medium text-blue-600 transition duration-300 cursor-pointer hover:text-blue-900">
                    <FaPlus />
                    ADD TO CART
                  </label>
                  <MdOutlineRemoveRedEye
                    title="View Book Details"
                    className="-translate-y-[3.5px] cursor-pointer transition duration-300 font-medium  text-blue-600 hover:text-blue-900 "
                  />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default ChildrenBooksSlider;
