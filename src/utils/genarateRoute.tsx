import type { ISidebarItem } from "@/const";

export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
  return sidebarItems.map((item) => ({
    path: item.url.trim(),
    Component: item.component,
  }));
};
