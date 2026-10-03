"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Property, PropertyImage } from "@/types/property.type";
import { formatCurrency, humanize } from "@/constants/property.constant";

type Props = {
  property: Property;
  images: PropertyImage[];
  vacantCount: number;
  startingRent: number | null;
};

/**
 * Full-bleed hero: fills the viewport edge to edge and sits under a
 * transparent, fixed navbar (the navbar must NOT reserve space above it).
 */
const PropertyHero = ({
  property,
  images,
  vacantCount,
  startingRent,
}: Props) => {
  const sorted = [...images].sort((a, b) => a.order - b.order);
  const primary = sorted.find((img) => img.is_primary) ?? sorted[0];
  const [activeId, setActiveId] = useState<string | undefined>(primary?.id);
  const active = sorted.find((img) => img.id === activeId) ?? primary;

  return (
    <section className="relative h-svh min-h-140 w-full overflow-hidden bg-muted">
      {active ? (
        <Image
          src={active.url}
          alt={property.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          <Building2 className="size-16" />
        </div>
      )}

      {/* darker at the top (keeps navbar text readable) and at the bottom (keeps the title readable) */}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-black/50" />

      <div className="absolute inset-x-0 bottom-0 text-white">
        <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-6 px-4 pb-10 md:px-6 md:pb-16">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge className="bg-white/90 text-black hover:bg-white/90">
                {humanize(property.type)}
              </Badge>
              {vacantCount > 0 && (
                <Badge className="bg-primary/90 text-white hover:bg-primary">
                  {vacantCount} vacant {vacantCount === 1 ? "unit" : "units"}
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl text-primary">
              {property.name}
            </h1>

            <p className="mt-3 flex items-center gap-1.5 text-sm text-white/80 md:text-base">
              <MapPin className="size-4 shrink-0" />
              {property.address}, {property.city}
            </p>

            <p className="mt-4 line-clamp-3 max-w-2xl text-sm text-white/85 md:text-base">
              {property.description}
            </p>

            {startingRent !== null && (
              <p className="mt-5 text-lg font-semibold md:text-2xl">
                From {formatCurrency(startingRent)}
                <span className="text-sm font-normal text-white/75">
                  {" "}
                  / month
                </span>
              </p>
            )}
          </div>

          {sorted.length > 1 && (
            <div className="hidden shrink-0 gap-2 md:flex">
              {sorted.slice(0, 4).map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveId(img.id)}
                  aria-label={`Show image ${img.order + 1}`}
                  className={cn(
                    "relative size-16 overflow-hidden rounded-lg border-2 transition",
                    img.id === active?.id
                      ? "border-white"
                      : "border-white/30 opacity-80 hover:opacity-100",
                  )}
                >
                  <Image
                    src={img.url}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyHero;
