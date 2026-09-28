import { z } from "zod";

import { FACILITIES, NEARBY_PLACE_TYPES } from "@/constants/property.constant";

const facilityValues = FACILITIES.map((f) => f.value) as [string, ...string[]];
const nearbyTypeValues = NEARBY_PLACE_TYPES.map((t) => t.value) as [
  string,
  ...string[],
];

export const createPropertySchema = z.object({
  name: z
    .string("Property name is required")
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name too long"),

  address: z
    .string("Address is required")
    .min(5, "Address must be at least 5 characters"),

  city: z
    .string("City is required")
    .min(2, "City must be at least 2 characters"),

  type: z.enum(["apartment", "house", "commercial"], {
    error: "Property type is required",
  }),

  total_units: z
    .string()
    .min(1, "Total units is required")
    .transform(Number)
    .pipe(
      z
        .number()
        .int("Must be a whole number")
        .min(1, "At least 1 unit")
        .max(500),
    ),
  // .number("Total units is required")
  // .int("Must be a whole number")
  // .positive("Must be greater than 0")
  // .max(500, "Cannot exceed 500 units"),

  description: z.string().max(500, "Description too long").optional(),

  facilities: z.array(z.enum(facilityValues)),

  nearby_places: z.array(
    z.object({
      type: z.enum(nearbyTypeValues),
      name: z.string().min(1, "Name is required"),
      distance_km: z
        .string()
        .min(1, "Distance is required")
        .transform(Number)
        .pipe(z.number().min(0, "Must be 0 or more")),
    }),
  ),
});

export type CreatePropertyFormInput = z.input<typeof createPropertySchema>; // strings
export type CreatePropertyInput = z.output<typeof createPropertySchema>; // numbers
