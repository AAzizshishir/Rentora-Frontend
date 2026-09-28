// "use client";

// import { useGetProperties } from "@/hooks/useProperties";
import { propertyService } from "@/services/property.service";
import { Property } from "@/types/property.type";
import { QueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import {
  ArrowUpRight,
  Badge,
  Building2,
  Home,
  ImageIcon,
  MapPin,
} from "lucide-react";
import PropertyCard from "../module/property/property-card";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import Link from "next/link";

const TopProperty = async () => {
  const queryClient = new QueryClient();

  //   const data = await queryClient.prefetchQuery({
  //     queryKey: ["properties", { limit: 3 }],
  //     queryFn: () => propertyService.getAll({ limit: 3 }),
  //   });

  const { data } = await propertyService.getAll();
  //   const { data } = useGetProperties();
  const properties = data;

  console.log(properties);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl text-[#ff9638] my-8">
        Find Your Dream Place
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-6">
        {properties?.map((property: Property) => (
          <div
            key={property.id}
            className=" border rounded-md shadow-md overflow-hidden hover:shadow-xl transition"
          >
            {property.images?.length > 0 ? (
              <Image
                src={property?.images[0].url}
                alt={property.name}
                className="w-full h-64 object-cover rounded-t-lg"
                width={300}
                height={600}
              />
            ) : (
              <div className="w-full h-64 bg-muted flex flex-col items-center justify-center rounded-t-lg gap-2">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">No image</p>
              </div>
            )}

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
              <Button className="w-full mt-2 transition">
                <Link href={`/all-property/${property.id}`}>See Details</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopProperty;
