import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDriverRequests: builder.query({
      query: () => ({
        url: "/admin/driver-requests",
        method: "GET",
      }),
    }),
    // Users
    getAllUsers: builder.query({
      query: () => ({ url: "/admin/getAllUser", method: "GET" }),
      providesTags: ["USERS"],
      transformResponse: (res) => res.data,
    }),
    changeBlockStatus: builder.mutation({
      query: (userId: string) => ({
        url: `/admin/changeBlockStatus/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS"],
    }),
    changeApprovalStatus: builder.mutation({
      query: (userId: string) => ({
        url: `/admin/changeApproveStatus/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS"],
    }),

    // ==============Rides============
    getAllRides: builder.query({
      query: () => ({ url: "/admin/getAllRide", method: "GET" }),
      providesTags: ["RIDES"],
      transformResponse: (res) => res.data,
    }),
    cancelRide: builder.mutation({
      query: (rideId: string) => ({
        url: `/admin/rides/${rideId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDES"],
    }),

    // =============drivers=============
    getPendingApprovals: builder.query({
      query: () => ({ url: "/admin/pending-approvals", method: "GET" }),
      providesTags: ["PendingApprovals"],
    }),

    approveDriver: builder.mutation({
      query: (driverId: string) => ({
        url: `/admin/approve-driver/${driverId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PendingApprovals", "USERS"],
    }),

    rejectDriver: builder.mutation({
      query: (driverId: string) => ({
        url: `/admin/reject-driver/${driverId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS"],
    }),
  }),
});
export const {
  useGetDriverRequestsQuery,
  useGetAllUsersQuery,
  useChangeBlockStatusMutation,
  useChangeApprovalStatusMutation,
  useGetAllRidesQuery,
  useCancelRideMutation,
  // status
  useGetPendingApprovalsQuery,
  useApproveDriverMutation,
  useRejectDriverMutation,
} = adminApi;
