import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableRides: builder.query({
      query: () => ({
        url: "/rides/available",
        method: "GET",
      }),
      providesTags: ["AvailableRides"],
      transformResponse: (response) => response.data,
    }),
    getRidesByDriver: builder.query({
      query: () => ({
        url: `/rides/driver-rides`,
        method: "GET",
      }),
      transformResponse: (response) => response.data[0],
      providesTags: ["DriverRides"],
    }),

    getDriverRideHistory: builder.query({
      query: () => ({
        url: `/drivers/driver-ride-history`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["DriverRideHistory"],
    }),

    requestApproval: builder.mutation({
      query: () => ({
        url: "/drivers/request-approval",
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVERS"],
    }),

    // ------------------------------------------------------

    acceptRide: builder.mutation({
      query: (rideId: string) => ({
        url: `/rides/${rideId}/accept`,
        method: "PATCH",
      }),
      invalidatesTags: ["AvailableRides"],
    }),

    markAsPickedUp: builder.mutation({
      query: (rideId: string) => ({
        url: `/rides/${rideId}/picked_up`,
        method: "PATCH",
      }),
      invalidatesTags: ["DriverRides"],
    }),

    makeTransitTrip: builder.mutation({
      query: (rideId: string) => ({
        url: `/rides/${rideId}/in_transit`,
        method: "PATCH",
      }),
      invalidatesTags: ["DriverRides"],
    }),

    completeRide: builder.mutation({
      query: (rideId: string) => ({
        url: `/rides/${rideId}/completed`,
        method: "PATCH",
      }),
      invalidatesTags: ["DriverRides"],
    }),

    markAsPaid: builder.mutation({
      query: (rideId: string) => ({
        url: `/rides/${rideId}/paid`,
        method: "PATCH",
      }),
      invalidatesTags: ["DriverRides"],
    }),
  }),
});
export const {
  useGetAvailableRidesQuery,
  useAcceptRideMutation,
  useGetRidesByDriverQuery,
  useMarkAsPickedUpMutation,
  useMakeTransitTripMutation,
  useCompleteRideMutation,
  useMarkAsPaidMutation,
  useGetDriverRideHistoryQuery,
  useRequestApprovalMutation,
} = driverApi;
