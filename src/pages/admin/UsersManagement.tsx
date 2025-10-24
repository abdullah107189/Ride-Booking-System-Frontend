/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreVertical,
  User,
  Ban,
  CheckCircle,
  Eye,
  Clock,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import {
  useApproveDriverMutation,
  useChangeBlockStatusMutation,
  useGetAllUsersQuery,
  useRejectDriverMutation,
} from "@/redux/features/admin/admin.api";
import { PageHeader } from "@/components/shared/PageHeader";

export function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { data: userData, isLoading } = useGetAllUsersQuery(undefined);
  const [changeBlockStatus] = useChangeBlockStatusMutation();
  const [approveDriver] = useApproveDriverMutation();
  const [rejectDriver] = useRejectDriverMutation();

  const users = userData?.users || [];

  const handleBlockUser = async (userId: string, currentStatus: boolean) => {
    try {
      await changeBlockStatus(userId).unwrap();
      toast.success(
        `User ${currentStatus ? "unblocked" : "blocked"} successfully`
      );
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update user status");
    }
  };

  const handleApproveDriver = async (driverId: string) => {
    try {
      await approveDriver(driverId).unwrap();
      toast.success("Driver approved successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to approve driver");
    }
  };

  const handleRejectDriver = async (driverId: string) => {
    try {
      await rejectDriver(driverId).unwrap();
      toast.success("Driver rejected successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reject driver");
    }
  };

  // Filter users based on search and status
  const filteredUsers =
    users?.filter((user: any) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "pending" && user.approvalStatus === "pending") ||
        (statusFilter === "approved" && user.isApproved) ||
        (statusFilter === "rejected" && user.approvalStatus === "rejected") ||
        (statusFilter === "blocked" && user.isBlocked);

      return matchesSearch && matchesStatus;
    }) || [];

  // Get approval status badge configuration
  const getApprovalBadge = (user: any) => {
    if (user.role !== "driver") {
      return null;
    }

    if (user.isApproved) {
      return {
        label: "Approved",
        color: "text-green-600",
        bgColor: "bg-green-500/10",
        icon: CheckCircle,
      };
    }

    switch (user.approvalStatus) {
      case "pending":
        return {
          label: "Pending Approval",
          color: "text-yellow-600",
          bgColor: "bg-yellow-500/10",
          icon: Clock,
        };
      case "rejected":
        return {
          label: "Rejected",
          color: "text-red-600",
          bgColor: "bg-red-500/10",
          icon: XCircle,
        };
      default:
        return {
          label: "Not Requested",
          color: "text-gray-600",
          bgColor: "bg-gray-500/10",
          icon: Clock,
        };
    }
  };

  // Count stats for dashboard
  const stats = {
    total: users.length,
    pending: users.filter((user: any) => user.approvalStatus === "pending")
      .length,
    approved: users.filter((user: any) => user.isApproved).length,
    rejected: users.filter((user: any) => user.approvalStatus === "rejected")
      .length,
    blocked: users.filter((user: any) => user.isBlocked).length,
  };

  if (isLoading) {
    return (
      <Card className="border border-border">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading users...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <PageHeader title="Users Management" />

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-4">
        <Card className="border border-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">
              {stats.total}
            </div>
            <div className="text-sm text-muted-foreground">Total Users</div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.approved}
            </div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.rejected}
            </div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.blocked}
            </div>
            <div className="text-sm text-muted-foreground">Blocked</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Users Management ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending Approval</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Account Status</TableHead>
                  <TableHead>Approval Status</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user: any) => {
                  const approvalBadge = getApprovalBadge(user);
                  return (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">
                              {user.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {user.email}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {user.phone}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === "driver"
                              ? "default"
                              : user.role === "admin"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.isBlocked ? "destructive" : "default"}
                          className={
                            user.isBlocked
                              ? "bg-red-500/10 text-red-600"
                              : "bg-green-500/10 text-green-600"
                          }
                        >
                          {user.isBlocked ? "Blocked" : "Active"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.role === "driver" && approvalBadge && (
                          <Badge
                            className={`${approvalBadge.bgColor} ${approvalBadge.color} flex items-center gap-1`}
                          >
                            <ShieldCheck className="h-3 w-3" />
                            {approvalBadge.label}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.role === "driver" && user.approvalRequestedAt && (
                          <div className="text-sm text-muted-foreground">
                            {new Date(
                              user.approvalRequestedAt
                            ).toLocaleDateString()}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {user.role !== "admin" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleBlockUser(user._id, user.isBlocked)
                                }
                              >
                                <Ban className="h-4 w-4 mr-2" />
                                {user.isBlocked ? "Unblock User" : "Block User"}
                              </DropdownMenuItem>
                            )}

                            {user.role === "driver" && (
                              <>
                                {!user.isApproved &&
                                  user.approvalStatus === "pending" && (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleApproveDriver(user._id)
                                      }
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                      Approve Driver
                                    </DropdownMenuItem>
                                  )}

                                {!user.isApproved &&
                                  user.approvalStatus === "pending" && (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleRejectDriver(user._id)
                                      }
                                      className="text-red-600"
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject Driver
                                    </DropdownMenuItem>
                                  )}

                                {user.isApproved && (
                                  <DropdownMenuItem
                                    onClick={() => handleRejectDriver(user._id)}
                                    className="text-red-600"
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Revoke Approval
                                  </DropdownMenuItem>
                                )}
                              </>
                            )}

                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No users found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
