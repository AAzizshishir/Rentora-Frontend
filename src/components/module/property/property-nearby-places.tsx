import { NearbyPlace } from "@/types/property.type";
import PropertySection from "./property-section";
import { formatDistance, getNearbyType } from "@/constants/property.constant";

const PropertyNearbyPlaces = ({ places }: { places: NearbyPlace[] }) => {
  if (!places?.length) return null;

  const sorted = [...places].sort(
    (a, b) => Number(a.distance_km) - Number(b.distance_km),
  );

  return (
    <PropertySection title="What's nearby" description="Closest first">
      <ul className="grid gap-3 sm:grid-cols-2">
        {sorted.map((place) => {
          const { label, icon: Icon } = getNearbyType(place.type);
          return (
            <li
              key={place.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-primary/30 p-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/90 text-black">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{place.name}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </div>
              <span className="shrink-0 text-sm font-medium">
                {formatDistance(place.distance_km)}
              </span>
            </li>
          );
        })}
      </ul>
    </PropertySection>
  );
};

export default PropertyNearbyPlaces;
