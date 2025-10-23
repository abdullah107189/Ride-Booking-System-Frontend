import App from "@/App";
import UnauthorizedPage from "@/components/shared/UnauthorizedPage";
import { role } from "@/const";
import { LoginForm } from "@/pages/auth/Login";
import { RegistrationForm } from "@/pages/auth/Register";
import About from "@/pages/public/About";
import { ContactForm } from "@/pages/public/Contact";
import { FAQSection } from "@/pages/public/FAQ";
import FeaturesPage from "@/pages/public/features";
import Home from "@/pages/public/Home";
import { generateRoutes } from "@/utils/genarateRoute";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter } from "react-router";
import { riderSidBarItems } from "./riderSideBarItem";
import { driverSidBarItems } from "./driverSideBarItem";
import { adminSidBarItems } from "./adminSideBarItem";
import CommonDashboard from "@/dashboard/CommontDashboard";
import AvailableRides from "@/pages/driver/AvailableRide";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/features",
        Component: FeaturesPage,
      },
      {
        path: "/contact",
        Component: ContactForm,
      },
      {
        path: "/faq",
        Component: FAQSection,
      },
    ],
  },
  {
    path: "/rider",
    Component: withAuth(CommonDashboard, role.RIDER),
    children: [...generateRoutes(riderSidBarItems)],
  },
  {
    path: "/driver",
    Component: withAuth(CommonDashboard, role.DRIVER),
    children: [
      { index: true, Component: AvailableRides },
      ...generateRoutes(driverSidBarItems),
    ],
  },
  {
    path: "/admin",
    Component: withAuth(CommonDashboard, role.ADMIN),
    children: [...generateRoutes(adminSidBarItems)],
  },
  {
    path: "/register",
    Component: RegistrationForm,
  },
  {
    path: "/login",
    Component: LoginForm,
  },
  {
    path: "/unauthorized",
    Component: UnauthorizedPage,
  },
]);
