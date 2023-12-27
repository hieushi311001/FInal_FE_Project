import BannerSection from "./BannerSection";
import DealSection from "./DealSection";
import HeroSection from "./HeroSection";
import WomanSection from "./WomanSection";
import ManSection from "./ManSection";
import SellSection from "./SellSection";
import AdsSection from "./AdsSection";
import BlogSection from "./Blogsection";
import PartnerLogo from "./PartnerLogo";
function HomePage() {
  return (
    <div>
      <HeroSection />
      <BannerSection />
      <WomanSection />
      <DealSection />
      <ManSection />
      <AdsSection />
      <SellSection />
      <BlogSection />
      <PartnerLogo />
    </div>
  );
}

export default HomePage;
