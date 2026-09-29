"use client";

import { useGetAllProperties } from "@/hooks/useProperties";
import Image from "next/image";
import { Building2, Home, ImageIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Property } from "@/types/property.type";

const PublicPropertyCard = () => {
  const { data } = useGetAllProperties();

  const properties = data?.data || [];
  const meta = data?.meta || {};

  console.log(properties);
  return (
    <section className="max-w-7xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties?.map((property: Property) => (
          <div
            key={property.id}
            className=" border rounded-md shadow-md overflow-hidden hover:shadow-xl transition"
          >
            {/* Image */}
            {property.images?.length > 0 ? (
              <Image
                src={property?.images[0].url}
                alt={property.name}
                className="w-full h-48 object-cover rounded-t-lg"
                width={400}
                height={400}
              />
            ) : (
              <div className="w-full h-48 bg-muted flex flex-col items-center justify-center rounded-t-lg gap-2">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">No image</p>
              </div>
            )}

            {/* Content */}
            <div className="p-4 space-y-2 border-[#024374] bg-transparent">
              <h1 className="flex gap-3">
                <Home className="w-5 h-5" /> {property.name}
              </h1>
              <h3 className="flex gap-3">
                <Building2 className="w-5 h-5" />
                {property.type} • {property.total_units} Units
              </h3>
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {property.address}, {property.city}
              </p>

              <Link href={`/all-property/${property.id}`}>
                <Button className="w-full mt-2 transition cursor-pointer">
                  View Property Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PublicPropertyCard;
