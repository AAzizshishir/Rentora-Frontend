"use client";

import ListingQueryFilters, {
  ListingFilterField,
} from "@/components/shared/listing-query-filters";

const booleanOptions = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

const unitFilters: ListingFilterField[] = [
  { name: "floor", label: "Floor", type: "number" },
  { name: "bedrooms", label: "Bedrooms", type: "number" },
  { name: "bathrooms", label: "Bathrooms", type: "number" },
  { name: "balconies", label: "Balconies", type: "number" },
  { name: "area_sqft", label: "Area (sq ft)", type: "number" },
  {
    name: "furnishing_status",
    label: "Furnishing",
    type: "select",
    options: [
      { label: "Fully furnished", value: "fully_furnished" },
      { label: "Semi furnished", value: "semi_furnished" },
      { label: "Unfurnished", value: "unfurnished" },
    ],
  },
  { name: "monthly_rent", label: "Monthly rent", type: "number" },
  {
    name: "has_parking",
    label: "Parking",
    type: "select",
    options: booleanOptions,
  },
  {
    name: "has_ac",
    label: "Air conditioning",
    type: "select",
    options: booleanOptions,
  },
  { name: "has_lift", label: "Lift", type: "select", options: booleanOptions },
  { name: "has_gas", label: "Gas", type: "select", options: booleanOptions },
  {
    name: "has_generator",
    label: "Generator",
    type: "select",
    options: booleanOptions,
  },
  {
    name: "has_water_supply",
    label: "Water supply",
    type: "select",
    options: booleanOptions,
  },
  {
    name: "is_pet_friendly",
    label: "Pet friendly",
    type: "select",
    options: booleanOptions,
  },
];

const UnitFilters = () => (
  <ListingQueryFilters
    fields={unitFilters}
    searchPlaceholder="Search by unit number"
  />
);

export default UnitFilters;
