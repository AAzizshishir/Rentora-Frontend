import { Building2, CalendarDays, DoorOpen, MapPin } from "lucide-react";
import PropertySection from "./property-section";
import { formatDate, humanize } from "@/constants/property.constant";
import { Property } from "@/types/property.type";

type Props = { property: Property; vacantCount: number };

const PropertyAbout = ({ property, vacantCount }: Props) => {
  const facts = [
    { icon: Building2, label: "Property type", value: humanize(property.type) },
    {
      icon: DoorOpen,
      label: "Total units",
      value: String(property.total_units),
    },
    { icon: DoorOpen, label: "Vacant now", value: String(vacantCount) },
    { icon: MapPin, label: "City", value: property.city },
    {
      icon: CalendarDays,
      label: "Listed on",
      value: formatDate(property.created_at),
    },
  ];

  return (
    <PropertySection title="About this property">
      <p className="max-w-3xl leading-relaxed text-muted-foreground">
        {property.description}
      </p>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {facts.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-xl border p-4 border-primary/30 flex items-center gap-4"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/90 text-black">
              <Icon className="size-5" />
            </span>
            <div>
              <dt className="text-xs text-muted-foreground mt-2">{label}</dt>
              <dd className="mt-0.5 font-medium">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </PropertySection>
  );
};

export default PropertyAbout;
