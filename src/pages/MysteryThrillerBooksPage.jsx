import IndividualPagesHeadings from "../components/Page_Headings/IndividualPagesHeadings";
import FilterSection from "../components/FilterSection";
import { Book } from "../components/tempary";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";

function MysteryThrillerBooksPage() {
  return (
    <div className="mt-5">
      <IndividualPagesHeadings pageHeading="Mystery / Thriller Books" />
      <div className="w-3/5 m-auto ">
        <FilterSection />
        <div className="grid grid-cols-6 grid-">
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
        </div>
      </div>
    </div>
  );
}

export default MysteryThrillerBooksPage;
