import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "auth/register",
        method: "POST",
        data: userInfo,
      }),
    }),
  }),
});
export const { useRegisterMutation } = authApi;
