import UnitCard from "@/components/module/unit/unit-card";
import UnitFilters from "@/components/module/unit/unit-filters";
import { unitService } from "@/services/unit.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

const parsePositiveInteger = (
  value: string | string[] | undefined,
  fallback: number,
) => {
  const parsed = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const UnitPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObject = await searchParams;
  const queryParams = {
    ...Object.fromEntries(
      Object.entries(searchParamsObject).filter(([, value]) => value !== undefined),
    ),
    page: parsePositiveInteger(searchParamsObject.page, 1),
    limit: parsePositiveInteger(searchParamsObject.limit, 6),
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["unit", queryParams],
    queryFn: () => unitService.getAll(queryParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading units...</div>}>
        <div className="space-y-6 py-6">
          <UnitFilters />
          <UnitCard params={queryParams} />
        </div>
      </Suspense>
    </HydrationBoundary>
  );
};

export default UnitPage;
