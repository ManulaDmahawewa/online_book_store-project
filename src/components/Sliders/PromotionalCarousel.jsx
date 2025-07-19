import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import banner from "../../assets/banners/banner1.png";

function PromotionalCarousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    appendDots: (dots) => (
      <div
        style={{
          transform: "translateY(-35px)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 transition duration-300 rounded-full opacity-50 bg-gray-100/40 hover:opacity-100"></div>
    ),
  };
  return (
    <div className="w-full overflow-hidden">
      <div className="slider-container">
        <Slider {...settings}>
          <div className="h-auto">
            <img src={banner} className="object-cover w-full" />
          </div>
          <div className="h-auto">
            <img src={banner} className="object-cover w-full" />
          </div>
          <div className="h-auto">
            <img src={banner} className="object-cover w-full" />
          </div>
          <div className="h-auto">
            <img src={banner} className="object-cover w-full" />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default PromotionalCarousel;
