import App from "@/App";
import UnauthorizedPage from "@/components/shared/UnauthorizedPage";
import { role } from "@/const";
import AdminDashboard from "@/dashboard/AdminDashboard";
import DriverDashboard from "@/dashboard/DriverDashboard";
import RiderDashboard from "@/dashboard/RiderDashboard";
import AddRide from "@/pages/admin/AddRide";
import { LoginForm } from "@/pages/auth/Login";
import { RegistrationForm } from "@/pages/auth/Register";
import About from "@/pages/public/About";
import { ContactForm } from "@/pages/public/Contact";
import { FAQSection } from "@/pages/public/FAQ";
import FeaturesPage from "@/pages/public/features";
import Home from "@/pages/public/Home";
import RideRequest from "@/pages/rider/RideRequest";
import RiderOverview from "@/pages/rider/RiderOverview";
import { generateRoutes } from "@/utils/genarateRoute";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";

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
    Component: withAuth(RiderDashboard, role.RIDER),
    children: [
      { path: "/rider/overview", Component: RiderOverview },
      {
        path: "/rider/ride-requests",
        Component: RideRequest,
      },
      // ...generateRoutes(userSidebarItems),
    ],
  },
  {
    path: "/driver",
    Component: withAuth(DriverDashboard, role.DRIVER),
    children: [
      {
        path: "add-ride",
        Component: AddRide,
      },
    ],
  },
  {
    path: "/admin",
    Component: withAuth(AdminDashboard, role.ADMIN),
    children: [
      {
        path: "add-ride",
        Component: AddRide,
      },
    ],
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
