import type { ISidebarItem } from "@/const";
import EarningsDashboard from "@/pages/admin/EarningsDashboard";
import { RidesManagement } from "@/pages/admin/RidesManagement";
import { UsersManagement } from "@/pages/admin/UsersManagement";
import { DollarSign, Motorbike, Users } from "lucide-react";

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
  {
    title: "Earnings Dashboard",
    url: "/admin/earnings",
    icon: DollarSign,
    component: EarningsDashboard,
  },
];
