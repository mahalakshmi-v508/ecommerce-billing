import HeroSection from "./HeroSection";
import WholesaleBenefits from "./WholesaleBenefits";
import Testimonials from "./Testimonials";
import BulkOrderBenefits from "./BulkOrderBenefits";
import WholesalePricing from "./WholesaleProcess";
import WholesaleProcess from "./WholesaleProcess";
import StatsSection from "./StatsSection";


export default function WholesalerHome () {
  return (
    <div className="wholesaler-home">
      <HeroSection />
      <StatsSection/>
      
      <WholesaleProcess/>
      <WholesaleBenefits />
      <BulkOrderBenefits/>
     
      
      <Testimonials />
    </div>
  );
}