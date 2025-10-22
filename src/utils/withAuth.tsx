import type { TRole } from "@/const";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (
  Component: ComponentType,
  requiredRole?: TRole | TRole[]
) => {
  return function AuthWrapper() {
    const { data, isLoading } = useGetMeQuery(undefined);
    if (isLoading) {
      return <div>Loading...</div>;
    }
    const userRole = data?.role;
    if (!isLoading && !userRole) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && !isLoading) {
      const allowedRoles = Array.isArray(requiredRole)
        ? requiredRole
        : [requiredRole];
      if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" />;
      }
    }

    return <Component />;
  };
};
