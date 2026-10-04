import PublicPropertyCard from "@/components/module/property/public-property-card";
import PropertyFilters from "@/components/module/property/property-filters";
import { propertyService } from "@/services/property.service";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

const AllPropertyPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryClient = new QueryClient();

  const searchParamsObject = await searchParams;
  const queryParams = Object.fromEntries(
    Object.entries(searchParamsObject).filter(
      ([, value]) => value !== undefined,
    ),
  );

  await queryClient.prefetchQuery({
    queryKey: ["properties", queryParams],
    queryFn: () => propertyService.getAll(queryParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6 px-4 pt-6">
        <Suspense fallback={<div>Loading filters...</div>}>
          <PropertyFilters />
        </Suspense>
        <PublicPropertyCard params={queryParams} />
      </div>
    </HydrationBoundary>
  );
};

export default AllPropertyPage;
