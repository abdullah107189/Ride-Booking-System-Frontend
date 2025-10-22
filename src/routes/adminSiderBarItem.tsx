import type { ISidebarItem } from "@/const";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Admin",
    items: [
      {
        title: "allUser",
        url: "/admin/allUsers",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      {
        title: "Add Tour",
        url: "/admin/addTour",
        component: AddTour,
      },
      {
        title: "Add Tour Type",
        url: "/admin/addTourType",
        component: AddTourType,
      },
      {
        title: "Add Division",
        url: "/admin/addDivision",
        component: AddDivision,
      },
    ],
  },
];
