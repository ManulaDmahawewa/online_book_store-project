import PromotionalCarousel from "../components/PromotionalCarousel";
import BestSellerBooksSlider from "../components/BestSellerBooksSlider";
import ScienceFictionBooksSlider from "../components/ScienceFictionBooksSlider";
import MysteryThrillerBooksSlider from "../components/MysteryThrillerBooksSlider";
import RomanceBooksSlider from "../components/RomanceBooksSlider";
import ChildrenBooksSlider from "../components/ChildrenBooksSlider";

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
