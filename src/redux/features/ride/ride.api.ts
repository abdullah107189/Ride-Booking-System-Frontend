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

    getRideHistory: builder.query({
      query: (params?: {
        page?: number;
        limit?: number;
        status?: string;
        search?: string;
        startDate?: string;
        minFare?: number;
        maxFare?: number;
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
  useGetRiderStatsQuery,
} = rideApi;
