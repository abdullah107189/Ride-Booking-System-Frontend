import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "auth/register",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["USERS"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["USERS"],
    }),
    getMe: builder.query({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
      providesTags: ["USERS"],
      transformResponse: (res) => res.data,
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USERS"],
    }),
    updateProfile: builder.mutation({
      query: (updateInfo) => ({
        url: "users/updateOwnProfile",
        method: "PATCH",
        data: updateInfo,
      }),
      invalidatesTags: ["USERS"],
    }),

    changePassword: builder.mutation({
      query: (passwordData: {
        currentPassword: string;
        newPassword: string;
      }) => ({
        url: "users/change-password",
        method: "PATCH",
        data: passwordData,
      }),
      invalidatesTags: ["USERS"],
    }),
  }),
});
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useLogoutMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authApi;
