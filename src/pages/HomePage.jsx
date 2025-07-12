import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { GiArrowScope } from "react-icons/gi";
import PromotionalCarousel from "../components/PromotionalCarousel";

function HomePage() {
  return (
    <div className="w-3/5 m-auto mt-5">
      <PromotionalCarousel />
    </div>
  );
}

export default HomePage;
