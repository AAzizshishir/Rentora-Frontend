import Banner from "@/components/layout/Banner";
// import BestDeals from "@/components/layout/Best-deals";
import HowItWorks from "@/components/layout/how-it-works";
import KeyFeatures from "@/components/layout/key-features";
import TopProperty from "@/components/layout/top-property";
import { bannerService } from "@/services/banner.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["banner"],
    queryFn: () => bannerService.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <Banner />
        {/* <BestDeals /> */}
        <TopProperty />
        <KeyFeatures />
        <HowItWorks />
      </div>
    </HydrationBoundary>
  );
}
