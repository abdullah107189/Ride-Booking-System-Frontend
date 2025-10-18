import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import AddRide from "@/pages/admin/AddRide";
import Home from "@/pages/public/Home";
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
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        path: "add-ride",
        Component: AddRide,
      },
    ],
  },
]);
