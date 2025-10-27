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
    changeOnlineStatus: builder.mutation({
      query: (userId: string) => ({
        url: `/admin/change-online-status/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS"],
    }),

    // ==============Rides============
    getAllRides: builder.query({
      query: (params?: {
        page?: number;
        limit?: number;
        status?: string;
        riderName?: string;
        driverName?: string;
        startDate?: string;
        endDate?: string;
        minFare?: number;
        maxFare?: number;
      }) => ({
        url: "/admin/getAllRide",
        method: "GET",
        params: params || {},
      }),
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
    getEarningsStats: builder.query({
      query: (timeRange?: "daily" | "weekly" | "monthly") => ({
        url: `/admin/earnings-stats?timeRange=${timeRange || "monthly"}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetDriverRequestsQuery,
  useGetAllUsersQuery,
  useChangeBlockStatusMutation,
  useChangeOnlineStatusMutation,
  useChangeApprovalStatusMutation,
  useGetAllRidesQuery,
  useCancelRideMutation,
  useGetEarningsStatsQuery,
  // status
  useGetPendingApprovalsQuery,
  useApproveDriverMutation,
  useRejectDriverMutation,
} = adminApi;
