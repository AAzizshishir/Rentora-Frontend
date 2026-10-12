import { NavRoute, Route } from "@/types/routes.type";

export const tenantRoutes: Route[] = [
  {
    title: "Tenant Dashboard",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "Profile",
        url: "/profile",
      },
      {
        title: "My Application",
        url: "/my-application",
      },
      {
        title: "My Lease",
        url: "/my-lease",
      },
      {
        title: "Payment",
        url: "/payment",
      },
      {
        title: "My Application For Landlord",
        url: "/my-application-for-landlord",
      },
    ],
  },
];

export const tenantNavRoutes: NavRoute[] = [
  { title: "Home", url: "/" },
  { title: "Property", url: "/all-property" },
  {
    title: "Units",
    url: "/units",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "List Your Property",
    url: "/apply-for-landlord",
  },
  {
    title: "Dashboard",
    url: "/tenant-dashboard",
  },
];
