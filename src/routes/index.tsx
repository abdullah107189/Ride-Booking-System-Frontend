import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import App from "@/App";

import { role } from "@/const";
import { generateRoutes } from "@/utils/genarateRoute";
import { withAuth } from "@/utils/withAuth";

import { riderSidBarItems } from "./riderSideBarItem";
import { driverSidBarItems } from "./driverSideBarItem";
import { adminSidBarItems } from "./adminSideBarItem";

// --- Lazy Loading ---

const LazyUnauthorizedPage = lazy(
  () => import("@/components/shared/UnauthorizedPage")
);
const LazyLoginForm = lazy(() =>
  import("@/pages/auth/Login").then((m) => ({ default: m.LoginForm }))
);
const LazyRegistrationForm = lazy(() =>
  import("@/pages/auth/Register").then((m) => ({ default: m.RegistrationForm }))
);
const LazyAbout = lazy(() => import("@/pages/public/About"));
const LazyContactForm = lazy(() =>
  import("@/pages/public/Contact").then((m) => ({ default: m.ContactForm }))
);
const LazyFAQSection = lazy(() =>
  import("@/pages/public/FAQ").then((m) => ({ default: m.FAQSection }))
);
const LazyFeaturesPage = lazy(() => import("@/pages/public/features"));
const LazyHome = lazy(() => import("@/pages/public/Home"));
const LazyNotFoundPage = lazy(() => import("@/components/shared/NotFoundPage"));

const LazyCommonDashboard = lazy(() => import("@/dashboard/CommontDashboard"));
const LazyProfileView = lazy(() =>
  import("@/components/shared/profile/ProfileView").then((m) => ({
    default: m.ProfileView,
  }))
);
const LazyProfileEdit = lazy(() =>
  import("@/components/shared/profile/ProfileEdit").then((m) => ({
    default: m.ProfileEdit,
  }))
);

const LazyAvailableRides = lazy(() => import("@/pages/driver/AvailableRide"));
const LazyUsersManagement = lazy(() =>
  import("@/pages/admin/UsersManagement").then((m) => ({
    default: m.UsersManagement,
  }))
);
const LazyRiderOverview = lazy(() =>
  import("@/pages/rider/RiderOverview").then((m) => ({
    default: m.RiderOverview,
  }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: LazyHome },
      { path: "/about", Component: LazyAbout },
      { path: "/features", Component: LazyFeaturesPage },
      { path: "/contact", Component: LazyContactForm },
      { path: "/faq", Component: LazyFAQSection },
    ],
  },
  {
    path: "/rider",
    Component: withAuth(LazyCommonDashboard, role.RIDER),
    children: [
      { index: true, Component: LazyRiderOverview },
      { path: "profile", Component: LazyProfileView },
      { path: "profile-edit", Component: LazyProfileEdit },
      ...generateRoutes(riderSidBarItems),
    ],
  },
  {
    path: "/driver",
    Component: withAuth(LazyCommonDashboard, role.DRIVER),
    children: [
      { index: true, Component: LazyAvailableRides },
      { path: "profile", Component: LazyProfileView },
      { path: "profile-edit", Component: LazyProfileEdit },
      ...generateRoutes(driverSidBarItems),
    ],
  },
  {
    path: "/admin",
    Component: withAuth(LazyCommonDashboard, role.ADMIN),
    children: [
      { index: true, Component: LazyUsersManagement },
      { path: "profile", Component: LazyProfileView },
      { path: "profile-edit", Component: LazyProfileEdit },
      ...generateRoutes(adminSidBarItems),
    ],
  },
  { path: "/register", Component: LazyRegistrationForm },
  { path: "/login", Component: LazyLoginForm },
  { path: "/unauthorized", Component: LazyUnauthorizedPage },
  { path: "*", Component: LazyNotFoundPage },
]);
