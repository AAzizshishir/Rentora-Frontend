import {
  Bus,
  CheckCircle2,
  Droplets,
  Flame,
  FireExtinguisher,
  GraduationCap,
  HeartPulse,
  MapPin,
  MoonStar,
  ParkingCircle,
  School,
  ShieldCheck,
  ShoppingBag,
  Sun,
  Utensils,
  Video,
  MoveVertical,
  type LucideIcon,
} from "lucide-react";

type IconConfig = { label: string; icon: LucideIcon };

export const humanize = (value: string) =>
  value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/* ---------- Facilities (Property.facilities enum values) ---------- */
const FACILITY_CONFIG: Record<string, IconConfig> = {
  parking: { label: "Parking", icon: ParkingCircle },
  security_guard: { label: "Security guard", icon: ShieldCheck },
  prayer_room: { label: "Prayer room", icon: MoonStar },
  lift: { label: "Lift", icon: MoveVertical },
  gas_line: { label: "Gas line", icon: Flame },
  fire_safety: { label: "Fire safety", icon: FireExtinguisher },
  cctv: { label: "CCTV", icon: Video },
  rooftop: { label: "Rooftop", icon: Sun },
  water_supply: { label: "Water supply", icon: Droplets },
};

export const getFacility = (key: string): IconConfig =>
  FACILITY_CONFIG[key] ?? { label: humanize(key), icon: CheckCircle2 };

/* ---------- Nearby place types ---------- */
const NEARBY_CONFIG: Record<string, IconConfig> = {
  school: { label: "School", icon: School },
  college: { label: "College", icon: GraduationCap },
  hospital: { label: "Hospital", icon: HeartPulse },
  restaurant: { label: "Restaurant", icon: Utensils },
  shopping_mall: { label: "Shopping mall", icon: ShoppingBag },
  bus_stop: { label: "Bus stop", icon: Bus },
};

export const getNearbyType = (key: string): IconConfig =>
  NEARBY_CONFIG[key] ?? { label: humanize(key), icon: MapPin };

/* ---------- Formatters ---------- */
export const formatCurrency = (value: string | number) =>
  `৳${Number(value).toLocaleString("en-BD")}`;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

export const isAvailableNow = (iso: string) => new Date(iso) <= new Date();

export const formatDistance = (km: string | number) => {
  const n = Number(km);
  return n < 1 ? `${Math.round(n * 1000)} m` : `${n} km`;
};
