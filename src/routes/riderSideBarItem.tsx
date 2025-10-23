import type { ISidebarItem } from "@/const";
import { RiderDashboard } from "@/dashboard/RiderDashboard";
import RideRequest from "@/pages/rider/RideRequest";
// import RiderOverview from "@/pages/rider/RiderOverview";
import { Receipt, SquareTerminal } from "lucide-react";

export const riderSidBarItems: ISidebarItem[] = [
  {
    title: "Ride Overview",
    url: "/rider/overview",
    icon: SquareTerminal,
    component: RiderDashboard,
  },
  {
    title: "Ride Requests",
    url: "/rider/ride-requests",
    icon: Receipt,
    component: RideRequest,
  },
];
