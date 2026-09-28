import Banner from "@/components/layout/Banner";
// import BestDeals from "@/components/layout/Best-deals";
import HowItWorks from "@/components/layout/how-it-works";
import KeyFeatures from "@/components/layout/key-features";
import TopProperty from "@/components/layout/top-property";

export default function Home() {
  return (
    <div>
      <Banner />
      {/* <BestDeals /> */}
      <TopProperty />
      <KeyFeatures />
      <HowItWorks />
    </div>
  );
}
