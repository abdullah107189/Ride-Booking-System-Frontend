import type { ComponentType } from "react";

export const enum role {
  ADMIN = "admin",
  DRIVER = "driver",
  RIDER = "rider",
  GUEST = "guest",
  PUBLIC = "public",
}
export type TRole = "admin" | "driver" | "rider" | "guest" | "public";

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
