import { Skeleton } from "@/components/ui/skeleton";

const PropertyDetailsSkeleton = () => (
  <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 md:px-6">
    <Skeleton className="h-105 w-full rounded-2xl md:h-135" />
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-8">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
      <Skeleton className="h-56 w-full rounded-2xl" />
    </div>
  </div>
);

export default PropertyDetailsSkeleton;
