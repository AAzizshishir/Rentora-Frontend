export type UnitStatus = "vacant" | "occupied";
export type FurnishingStatus =
  | "fully_furnished"
  | "semi_furnished"
  | "unfurnished";
export type UnitType = "apartment" | "penthouse" | "studio";

export interface Images {
  id: string;
  unit_id: string;
  url: string;
  is_primary: boolean;
}

export type Unit = {
  id: string;
  property_id: string;
  unit_number: string;
  images: Images[];
  type: string; // e.g. three_bed
  status: string; // e.g. vacant
  floor: number;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  area_sqft: string | number;
  monthly_rent: string | number;
  security_deposit_months: number;
  furnishing_status: string;
  available_from: string;
  has_ac: boolean;
  has_gas: boolean;
  has_generator: boolean;
  has_lift: boolean;
  has_parking: boolean;
  has_water_supply: boolean;
  is_pet_friendly: boolean;
};
