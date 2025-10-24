import type { ISidebarItem } from "@/const";
import RideRequest from "@/pages/rider/RideRequest";
import { RiderOverview } from "@/pages/rider/RiderOverview";
import { Receipt, SquareTerminal } from "lucide-react";

export const riderSidBarItems: ISidebarItem[] = [
  {
    title: "Ride Overview",
    url: "/rider/overview",
    icon: SquareTerminal,
    component: RiderOverview,
  },
  {
    title: "Ride Requests",
    url: "/rider/ride-requests",
    icon: Receipt,
    component: RideRequest,
  },
];
