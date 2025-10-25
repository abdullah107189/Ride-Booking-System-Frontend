import { baseApi } from "@/redux/baseApi";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    rideRequest: builder.mutation({
      query: (requestData) => ({
        url: "rides/request",
        method: "POST",
        data: requestData,
      }),
      invalidatesTags: ["RIDES"],
    }),

    getRidesByRider: builder.query({
      query: () => ({
        url: "/rides/current",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: ["RIDES"],
    }),

    // Get ride history for rider
    getRideHistory: builder.query({
      query: (params?: {
        page?: number;
        limit?: number;
        status?: string;
        startDate?: string;
        endDate?: string;
        sortBy?: string;
        sortOrder?: string;
      }) => ({
        url: "/rides/history",
        method: "GET",
        params,
      }),
      providesTags: ["RIDE_HISTORY"],
    }),

    // Cancel ride
    cancelRide: builder.mutation({
      query: (rideId: string) => ({
        url: `/rides/${rideId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDES"],
    }),

    // Rate ride
    rateRide: builder.mutation({
      query: ({
        rideId,
        rating,
        feedback,
      }: {
        rideId: string;
        rating: number;
        feedback?: string;
      }) => ({
        url: `/rides/${rideId}/rate`,
        method: "POST",
        data: { rating, feedback },
      }),
      invalidatesTags: ["RIDES", "RIDE_HISTORY"],
    }),
    
    getRiderStats: builder.query({
      query: () => ({
        url: "/rides/rider/stats",
        method: "GET",
      }),
      providesTags: ["RIDES"],
    }),
  }),
});
export const {
  useRideRequestMutation,
  useGetRidesByRiderQuery,
  useGetRideHistoryQuery,
  useCancelRideMutation,
  useRateRideMutation,
  useGetRiderStatsQuery,
} = rideApi;
