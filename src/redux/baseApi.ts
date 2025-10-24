import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: [
    "USERS",
    "RIDES",
    "DriverRideHistory",
    "AvailableRides",
    "DriverRides",
    "RiderRides",
  ],
});
