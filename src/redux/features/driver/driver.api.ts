export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableRides: builder.query({
      query: () => ({
        url: "/drivers/available-rides",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetAvailableRidesQuery } = driverApi;
