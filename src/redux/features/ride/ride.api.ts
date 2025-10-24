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
  }),
});
export const { useRideRequestMutation } = rideApi;
