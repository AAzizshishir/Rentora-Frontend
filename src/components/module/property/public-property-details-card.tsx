"use client";

import PropertyDetailsSkeleton from "@/components/shared/property-details-skeleton";
import { usePropertyDetails } from "@/hooks/useProperties";
import { Property, PropertyImage } from "@/types/property.type";
import PropertyHero from "./property-hero";
import PropertyAbout from "./property-about";
import PropertyUnits from "./property-units";
import PropertyFacilities from "./property-facilities";
import PropertyNearbyPlaces from "./property-nearby-places";

const PublicPropertyDetailsCard = ({ propertyId }: { propertyId: string }) => {
  const { data, isLoading, error } = usePropertyDetails(propertyId);
  const property: Property | undefined = data?.data;

  if (isLoading) return <PropertyDetailsSkeleton />;

  if (error || !property) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Property not found</h1>
        <p className="mt-2 text-muted-foreground">
          This property may have been removed, or the link is incorrect.
        </p>
      </div>
    );
  }
  console.log(property.facilities);

  // images can arrive as an array or a single object depending on the API
  const images: PropertyImage[] = Array.isArray(property.images)
    ? property.images
    : property.images
      ? [property.images as PropertyImage]
      : [];

  const units = property.units ?? [];
  const vacantUnits = units.filter((u) => u.status === "vacant");
  const startingRent = vacantUnits.length
    ? Math.min(...vacantUnits.map((u) => Number(u.monthly_rent)))
    : null;

  return (
    <div>
      <PropertyHero
        property={property}
        images={images}
        vacantCount={vacantUnits.length}
        startingRent={startingRent}
      />

      <div className="grid gap-8 mx-auto w-full max-w-7xl space-y-8 px-4 py-6 md:px-6">
        <div className="min-w-0 space-y-10">
          <PropertyAbout property={property} vacantCount={vacantUnits.length} />
          <PropertyUnits units={units} />
          <PropertyFacilities facilities={property.facilities} />
          <PropertyNearbyPlaces places={property.nearby_places} />
        </div>
      </div>
    </div>
  );
};

export default PublicPropertyDetailsCard;
