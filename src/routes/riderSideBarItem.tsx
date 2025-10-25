import type { ISidebarItem } from "@/const";
import { BookRide } from "@/pages/rider/BookRide";
import { RideHistory } from "@/pages/rider/RideHistory";
import { RiderOverview } from "@/pages/rider/RiderOverview";
import { RiderTracking } from "@/pages/rider/RiderTracking";
import { ClipboardClock, History, Locate, SquareTerminal } from "lucide-react";

export const riderSidBarItems: ISidebarItem[] = [
  {
    title: "Ride Overview",
    url: "/rider/overview",
    icon: SquareTerminal,
    component: RiderOverview,
  },
  {
    title: "Ride Book",
    icon: ClipboardClock,
    url: "/rider/book-ride",
    component: BookRide,
  },
  {
    title: "Ride Tracking",
    icon: Locate,
    url: "/rider/tracking",
    component: RiderTracking,
  },
  {
    title: "Ride History",
    icon: History,
    url: "/rider/ride-history",
    component: RideHistory,
  },
];
