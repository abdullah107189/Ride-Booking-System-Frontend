import type { ISidebarItem } from "@/const";
import { RidesManagement } from "@/pages/admin/RidesManagement";
import { UsersManagement } from "@/pages/admin/UsersManagement";
import { Motorbike, Users } from "lucide-react";

export const adminSidBarItems: ISidebarItem[] = [
  {
    title: "User Management",
    url: "/admin/users-management",
    icon: Users,
    component: UsersManagement,
  },
  {
    title: "Rider Management",
    url: "/admin/rider-management",
    icon: Motorbike,
    component: RidesManagement,
  },
];
