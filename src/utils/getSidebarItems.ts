import { role } from "@/const";
import { adminSidBarItems } from "@/routes/adminSideBarItem";
import { driverSidBarItems } from "@/routes/driverSideBarItem";
import { riderSidBarItems } from "@/routes/riderSideBarItem";

export const getSidebarItems = (userRole: role) => {
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
