import { role, type RoleType } from "@/const";
import { adminSidBarItems } from "@/routes/adminSideBarItem";
import { driverSidBarItems } from "@/routes/driverSideBarItem";
import { riderSidBarItems } from "@/routes/riderSideBarItem";

export const getSidebarItems = (userRole: RoleType) => {
  switch (userRole) {
    case role.ADMIN:
      return [...adminSidBarItems];
    case role.DRIVER:
      return [...driverSidBarItems];
    case role.RIDER:
      return [...riderSidBarItems];
    default:
      break;
  }
};
