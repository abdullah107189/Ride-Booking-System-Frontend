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
  Car,
  Eye,
  XCircle,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  User,
} from "lucide-react";
import { toast } from "sonner";
import {
  useCancelRideMutation,
  useGetAllRidesQuery,
} from "@/redux/features/admin/admin.api";
import { PageHeader } from "@/components/shared/PageHeader";

export function RidesManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [riderFilter, setRiderFilter] = useState<string>("");
  const [driverFilter, setDriverFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [minFare, setMinFare] = useState<string>("");
  const [maxFare, setMaxFare] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { data: ridesData, isLoading } = useGetAllRidesQuery({
    page: currentPage,
    limit: 10,
    status: statusFilter !== "all" ? statusFilter : undefined,
    riderName: riderFilter || undefined,
    driverName: driverFilter || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    minFare: minFare ? Number(minFare) : undefined,
    maxFare: maxFare ? Number(maxFare) : undefined,
  });

  const [cancelRide] = useCancelRideMutation();

  const rides = ridesData?.data || [];
  const pagination = ridesData?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  // Clear all filters
  const clearFilters = () => {
    setStatusFilter("all");
    setRiderFilter("");
    setDriverFilter("");
    setStartDate("");
    setEndDate("");
    setMinFare("");
    setMaxFare("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Check if any filter is active
  const hasActiveFilters =
    statusFilter !== "all" ||
    riderFilter ||
    driverFilter ||
    startDate ||
    endDate ||
    minFare ||
    maxFare ||
    searchTerm;

  const handleCancelRide = async (rideId: string) => {
    try {
      await cancelRide(rideId).unwrap();
      toast.success("Ride cancelled successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel ride");
    }
  };

  const getStatusConfig = (status: string) => {
    const configs: any = {
      requested: {
        color: "text-yellow-600",
        bgColor: "bg-yellow-500/10",
        label: "Requested",
      },
      accepted: {
        color: "text-blue-600",
        bgColor: "bg-blue-500/10",
        label: "Accepted",
      },
      picked_up: {
        color: "text-green-600",
        bgColor: "bg-green-500/10",
        label: "Picked Up",
      },
      in_transit: {
        color: "text-purple-600",
        bgColor: "bg-purple-500/10",
        label: "In Transit",
      },
      completed: {
        color: "text-green-600",
        bgColor: "bg-green-500/10",
        label: "Completed",
      },
      paid: {
        color: "text-gray-600",
        bgColor: "bg-gray-500/10",
        label: "Paid",
      },
      canceled: {
        color: "text-red-600",
        bgColor: "bg-red-500/10",
        label: "Canceled",
      },
    };
    return configs[status] || configs.requested;
  };

  if (isLoading) {
    return (
      <Card className="border border-border">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading rides...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <PageHeader title="Ride Management"></PageHeader>

      <Card className="border border-border mt-4">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              Rides Management ({pagination.total})
              {hasActiveFilters && (
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  (Filtered)
                </span>
              )}
            </CardTitle>

            {/* Active Filters Badges */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {statusFilter !== "all" && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Status: {statusFilter}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setStatusFilter("all")}
                    />
                  </Badge>
                )}
                {riderFilter && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Rider: {riderFilter}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setRiderFilter("")}
                    />
                  </Badge>
                )}
                {driverFilter && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Driver: {driverFilter}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setDriverFilter("")}
                    />
                  </Badge>
                )}
                {(startDate || endDate) && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Date: {startDate} {endDate && `to ${endDate}`}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => {
                        setStartDate("");
                        setEndDate("");
                      }}
                    />
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-6 text-xs"
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by location, rider or driver..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Advanced Filters
              {hasActiveFilters && (
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-4 border-dashed border-border bg-card mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full p-2 border border-input rounded-md text-sm bg-background text-foreground"
                  >
                    <option value="all">All Status</option>
                    <option value="requested">Requested</option>
                    <option value="accepted">Accepted</option>
                    <option value="picked_up">Picked Up</option>
                    <option value="in_transit">In Transit</option>
                    <option value="completed">Completed</option>
                    <option value="paid">Paid</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </div>

                {/* Rider Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">
                    Rider Name
                  </label>
                  <Input
                    placeholder="Filter by rider..."
                    value={riderFilter}
                    onChange={(e) => {
                      setRiderFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-sm"
                  />
                </div>

                {/* Driver Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">
                    Driver Name
                  </label>
                  <Input
                    placeholder="Filter by driver..."
                    value={driverFilter}
                    onChange={(e) => {
                      setDriverFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-sm"
                  />
                </div>

                {/* Date Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">
                    End Date
                  </label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-sm"
                  />
                </div>

                {/* Fare Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">
                    Min Fare (৳)
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={minFare}
                    onChange={(e) => {
                      setMinFare(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">
                    Max Fare (৳)
                  </label>
                  <Input
                    type="number"
                    placeholder="1000"
                    value={maxFare}
                    onChange={(e) => {
                      setMaxFare(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-sm"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Rides Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ride Info</TableHead>
                  <TableHead>Rider & Driver</TableHead>
                  <TableHead>Fare</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rides.map((ride: any) => {
                  const statusConfig = getStatusConfig(ride.status);
                  return (
                    <TableRow key={ride._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">
                            {ride.pickupLocation?.address}
                          </div>
                          <div className="text-sm text-muted-foreground">→</div>
                          <div className="font-medium text-foreground">
                            {ride.destinationLocation?.address}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div>
                            <div className="text-sm font-medium flex items-center gap-1">
                              <User className="h-3 w-3" />
                              Rider:
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {ride.rider?.name || "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium flex items-center gap-1">
                              <Car className="h-3 w-3" />
                              Driver:
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {ride.driver?.name || "Not assigned"}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-lg font-bold text-green-600">
                          ৳{ride.fare || "N/A"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${statusConfig.bgColor} ${statusConfig.color}`}
                        >
                          {statusConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {new Date(ride.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(ride.createdAt).toLocaleTimeString()}
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
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {!["completed", "paid", "canceled"].includes(
                              ride.status
                            ) && (
                              <DropdownMenuItem
                                onClick={() => handleCancelRide(ride._id)}
                                className="text-red-600"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Cancel Ride
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * 10 + 1} to{" "}
                {Math.min(currentPage * 10, pagination.total)} of{" "}
                {pagination.total} rides
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: Math.min(5, pagination.totalPages) },
                    (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      );
                    }
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, pagination.totalPages)
                    )
                  }
                  disabled={currentPage === pagination.totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {rides.length === 0 && (
            <div className="text-center py-8">
              <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {hasActiveFilters
                  ? "No rides match your filters"
                  : "No rides found"}
              </p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-2"
                >
                  Clear all filters
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
