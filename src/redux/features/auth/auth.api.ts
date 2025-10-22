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
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});
export const { useRegisterMutation, useLoginMutation, useGetMeQuery, useLogoutMutation } = authApi;
