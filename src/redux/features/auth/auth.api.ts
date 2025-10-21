import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "auth/register",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["USER"],
    }),
    getMe: builder.query({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
      providesTags: ["USER"],
      transformResponse:res => res.data
    }),
  }),
});
export const { useRegisterMutation, useLoginMutation, useGetMeQuery } = authApi;
