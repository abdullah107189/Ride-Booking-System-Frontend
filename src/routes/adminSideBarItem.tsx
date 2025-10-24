import type { ISidebarItem } from "@/const";
import DriverRequest from "@/pages/admin/DriverRequest";
import { RidesManagement } from "@/pages/admin/RidesManagement";
import { UsersManagement } from "@/pages/admin/UsersManagement";
import { CarIcon, Motorbike } from "lucide-react";

export const adminSidBarItems: ISidebarItem[] = [
  {
    title: "Driver Requests",
    url: "/admin/driver-requests",
    icon: CarIcon,
    component: DriverRequest,
  },
  {
    title: "User Management",
    url: "/admin/users-management",
    icon: CarIcon,
    component: UsersManagement,
  },
  {
    title: "Rider Management",
    url: "/admin/rider-management",
    icon: Motorbike,
    component: RidesManagement,
  },
];
