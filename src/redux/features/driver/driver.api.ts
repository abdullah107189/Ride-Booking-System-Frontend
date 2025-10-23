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
    acceptRide: builder.mutation({
      query: (rideId: string) => ({
        url: `/rides/${rideId}/accept`,
        method: "PATCH",
      }),
      invalidatesTags: ["AvailableRides"],
    }),
  }),
});
export const { useGetAvailableRidesQuery, useAcceptRideMutation } = driverApi;
