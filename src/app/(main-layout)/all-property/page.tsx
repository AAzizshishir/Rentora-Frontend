import PublicPropertyCard from "@/components/module/property/public-property-card";
import { propertyService } from "@/services/property.service";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const AllPropertyPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["properties"],
    queryFn: () => propertyService.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PublicPropertyCard />
    </HydrationBoundary>
  );
};

export default AllPropertyPage;
