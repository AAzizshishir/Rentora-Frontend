import { getFacility } from "@/constants/property.constant";
import PropertySection from "./property-section";

const PropertyFacilities = ({ facilities }: { facilities: string[] }) => {
  if (!facilities?.length) return null;

  return (
    <PropertySection
      title="Facilities"
      description="Shared across the whole building"
    >
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {facilities.map((key) => {
          const { label, icon: Icon } = getFacility(key);
          return (
            <li
              key={key}
              className="flex items-center gap-3 rounded-xl border border-primary/30 p-3"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/90 text-black">
                <Icon className="size-5" />
              </span>
              <span className="text-sm font-medium">{label}</span>
            </li>
          );
        })}
      </ul>
    </PropertySection>
  );
};

export default PropertyFacilities;
