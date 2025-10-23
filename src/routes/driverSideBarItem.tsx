import type { ISidebarItem } from "@/const";
import AvailableRide from "@/pages/driver/AvailableRide";
import {
  DriverHistory,
} from "@/pages/driver/DriverRideHistory";
import { DriverTracking } from "@/pages/driver/DriverTracking";
import { Car, History, SquareTerminal } from "lucide-react";

export const driverSidBarItems: ISidebarItem[] = [
  {
    title: "Available Rides",
    url: "/driver/available-rides",
    icon: SquareTerminal,
    component: AvailableRide,
  },
  {
    title: "Tracked Rides",
    url: "/driver/tracked-rides",
    icon: Car,
    component: DriverTracking,
  },
  {
    title: "Rides History",
    url: "/driver/ride-history",
    icon: History,
    component: DriverHistory,
  },
];
