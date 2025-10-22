import type { ISidebarItem } from "@/const";
import AvailableRide from "@/pages/driver/AvailableRide";
import { SquareTerminal } from "lucide-react";

export const driverSidBarItems: ISidebarItem[] = [
  {
    title: "Available Rides",
    url: "/driver/available-rides",
    icon: SquareTerminal,
    component: AvailableRide,
  },
];
