import App from "@/App";
import { role } from "@/const";
import AdminDashboard from "@/dashboard/AdminDashboard";
import DriverDashboard from "@/dashboard/DriverDashboard";
import RiderDashboard from "@/dashboard/RiderDashboard";
import AddRide from "@/pages/admin/AddRide";
import { LoginForm } from "@/pages/auth/Login";
import { RegistrationForm } from "@/pages/auth/Register";
import About from "@/pages/public/About";
import FeaturesPage from "@/pages/public/features";
import Home from "@/pages/public/Home";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter } from "react-router";

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
    ],
  },
  {
    path: "/rider",
    Component: withAuth(RiderDashboard, role.RIDER),
    children: [
      {
        path: "add-ride",
        Component: AddRide,
      },
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
]);
