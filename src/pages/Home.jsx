import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Featured from "../components/Featured";
import PromoBanner from "../components/PromoBanner";
import DealOfTheDay from "../components/DealOfTheDay";
import TrendingProducts from "../components/TrendingProducts";
import SpecialOffers from "../components/SpecialOffers";
import FlatHeelsBanner from "../components/FlatHeelsBanner";
import NewArrivals from "../components/NewArrivals";
import Sponsored from "../components/Sponsored";
import BottomNav from "../components/BottomNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] pb-18">
      <div className="mx-auto w-full lg:max-w-7xl">
        <Header />
        <SearchBar />
        <Featured />
        <PromoBanner />
        <DealOfTheDay />
        <SpecialOffers />
        <FlatHeelsBanner />
        <TrendingProducts />
        <NewArrivals />
        <Sponsored />
      </div>

      <BottomNav />
    </div>
  );
}