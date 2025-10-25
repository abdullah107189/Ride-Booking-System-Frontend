import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: [
    "USERS",
    "RIDES",
    "DRIVERS",
    "DriverRideHistory",
    "AvailableRides",
    "DriverRides",
    "RiderRides",
    "PendingApprovals",
    "RIDE_HISTORY",
  ],
});
