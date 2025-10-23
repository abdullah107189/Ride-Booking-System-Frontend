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
  }),
});
export const { useGetAvailableRidesQuery } = driverApi;
