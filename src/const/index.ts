import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export const role = {
  ADMIN: "admin",
  DRIVER: "driver",
  RIDER: "rider",
  GUEST: "guest",
  PUBLIC: "public",
} as const;

export type RoleType = (typeof role)[keyof typeof role];
export type TRole = "admin" | "driver" | "rider" | "guest" | "public";

export interface ISidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
  component: ComponentType;
}
