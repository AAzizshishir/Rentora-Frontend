"use client";

import ListingQueryFilters, {
  ListingFilterField,
} from "@/components/shared/listing-query-filters";

const propertyFilters: ListingFilterField[] = [
  { name: "city", label: "City", type: "text" },
  { name: "name", label: "Property name", type: "text" },
  {
    name: "type",
    label: "Property type",
    type: "select",
    options: [
      { label: "Apartment", value: "apartment" },
      { label: "House", value: "house" },
      { label: "Commercial", value: "commercial" },
    ],
  },
];

const PropertyFilters = () => (
  <ListingQueryFilters
    fields={propertyFilters}
    searchPlaceholder="Search name, address, city, or description"
  />
);

export default PropertyFilters;
