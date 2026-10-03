import { Unit } from "./unit.type";

export type PropertyType = "apartment" | "house" | "commercial";

export interface Images {
  id: string;
  property_id: string;
  url: string;
  is_primary: boolean;
}

export type Property = {
  id: string;
  name: string;
  description: string;
  type: string; // apartment | house ...
  address: string;
  city: string;
  total_units: number;
  facilities: string[];
  images: PropertyImage[];
  units: Unit[];
  nearby_places: NearbyPlace[];
  landlord_id: string;
  created_at: string;
  updated_at: string;
};

export interface ICreateProperty {
  name: string;
  address: string;
  city: string;
  type: PropertyType;
  total_units: number;
  description?: string;
}

export type PropertyImage = {
  id: string;
  property_id: string;
  url: string;
  public_id: string;
  is_primary: boolean;
  order: number;
  created_at: string;
};

export type NearbyPlace = {
  id: string;
  property_id: string;
  type: string; // school | college | hospital | restaurant | shopping_mall | bus_stop ...
  name: string;
  distance_km: string | number; // Prisma Decimal arrives as a string
};
