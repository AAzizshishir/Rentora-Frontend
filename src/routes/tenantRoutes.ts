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
        title: "Apply For Landlord",
        url: "/apply-for-landlord",
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
    title: "Dashboard",
    url: "/tenant-dashboard",
  },
];
