import PromotionalCarousel from "../components/Sliders/PromotionalCarousel";
import BestSellerBooksSlider from "../components/Sliders/BestSellerBooksSlider";
import ScienceFictionBooksSlider from "../components/Sliders/ScienceFictionBooksSlider";
import MysteryThrillerBooksSlider from "../components/Sliders/MysteryThrillerBooksSlider";
import RomanceBooksSlider from "../components/Sliders/RomanceBooksSlider";
import ChildrenBooksSlider from "../components/Sliders/ChildrenBooksSlider";

function HomePage() {
  return (
    <div className="w-3/5 m-auto mt-5">
      <PromotionalCarousel />
      <BestSellerBooksSlider />
      <ScienceFictionBooksSlider />
      <MysteryThrillerBooksSlider />
      <RomanceBooksSlider />
      <ChildrenBooksSlider />
    </div>
  );
}

export default HomePage;
