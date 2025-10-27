/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Clock,
  Calendar,
  DollarSign,
  Car,
  CheckCircle2,
  Phone,
  ListStart,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { useGetDriverRideHistoryQuery } from "@/redux/features/driver/driver.api";

type RideStatus = "completed" | "paid" | "canceled";

const statusConfigs = {
  completed: {
    label: "Completed",
    color: "text-green-600",
    bgColor: "bg-green-600/10",
    icon: CheckCircle2,
  },
  paid: {
    label: "Paid",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    icon: DollarSign,
  },
  canceled: {
    label: "Canceled",
    color: "text-red-600",
    bgColor: "bg-red-600/10",
    icon: Clock,
  },
};

export function DriverHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [minFare, setMinFare] = useState<string>("");
  const [maxFare, setMaxFare] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: ridesInfo,
    isLoading,
    error,
  } = useGetDriverRideHistoryQuery({
    page: currentPage,
    limit: 5,
    status: statusFilter !== "all" ? statusFilter : undefined,
    search: searchQuery || undefined,
    startDate: dateFilter || undefined,
    minFare: minFare ? Number(minFare) : undefined,
    maxFare: maxFare ? Number(maxFare) : undefined,
  });

  const { history: rides, driverInfo, pagination } = ridesInfo || {};

  // Clear all filters
  const clearFilters = () => {
    setStatusFilter("all");
    setDateFilter("");
    setMinFare("");
    setMaxFare("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Check if any filter is active
  const hasActiveFilters =
    statusFilter !== "all" || dateFilter || minFare || maxFare || searchQuery;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading ride history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <p className="text-red-600">Failed to load ride history</p>
        </div>
      </div>
    );
  }

  if (!rides || rides.length === 0) {
    return (
      <div className="">
        <PageHeader title="Rides History"></PageHeader>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by location, rider name or phone..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
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
              Filters
              {hasActiveFilters && (
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-4 border-dashed border-border bg-card mt-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    className="w-full p-2 border border-input rounded-md text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="all">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </div>

                {/* Date Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => {
                      setDateFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-sm bg-background text-foreground"
                  />
                </div>

                {/* Min Fare */}
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
                    className="text-sm bg-background text-foreground"
                  />
                </div>

                {/* Max Fare */}
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
                    className="text-sm bg-background text-foreground"
                  />
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="mxw py-5">
          <div className="text-center">
            <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {hasActiveFilters ? "No matching rides found" : "No Ride History"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {hasActiveFilters
                ? "Try adjusting your filters to see more results"
                : "Your completed rides will appear here"}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <PageHeader title="Ride History" />

        {/* Stats Overview */}
        <div className="grid grid-cols-1 mt-4 md:grid-cols-4 gap-6 mb-8">
          <Card className="border border-border">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-foreground mb-2">
                {pagination?.total || 0}
              </div>
              <div className="text-sm text-muted-foreground">Total Rides</div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {rides.filter((ride: any) => ride.status === "paid").length}
              </div>
              <div className="text-sm text-muted-foreground">Paid Rides</div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-foreground mb-2">
                ৳{driverInfo?.totalEarnings?.toFixed(2) || "0.00"}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Earnings
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-foreground mb-2">
                {rides.length > 0
                  ? (
                      rides.reduce(
                        (total: number, ride: any) =>
                          total + (ride.rider?.rating || 0),
                        0
                      ) / rides.length
                    ).toFixed(1)
                  : "0.0"}
              </div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
        </div>
        {/* Search and Filters */}
        <div className="mb-6 mt-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by location, rider name or phone..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
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
              Filters
              {hasActiveFilters && (
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}
            </Button>
          </div>

          {/* Active Filters Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-3">
              {statusFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Status: {statusFilter}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setStatusFilter("all")}
                  />
                </Badge>
              )}
              {dateFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Date: {dateFilter}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setDateFilter("")}
                  />
                </Badge>
              )}
              {(minFare || maxFare) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Fare: {minFare || "0"} - {maxFare || "∞"}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => {
                      setMinFare("");
                      setMaxFare("");
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

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-4 border-dashed border-border bg-card mt-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    className="w-full p-2 border border-input rounded-md text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="all">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </div>

                {/* Date Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => {
                      setDateFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-sm bg-background text-foreground"
                  />
                </div>

                {/* Min Fare */}
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
                    className="text-sm bg-background text-foreground"
                  />
                </div>

                {/* Max Fare */}
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
                    className="text-sm bg-background text-foreground"
                  />
                </div>
              </div>
            </Card>
          )}
        </div>
        {/* Ride History List */}
        <div className="grid gap-6 mb-6">
          {rides.map((ride: any) => {
            const statusConfig = statusConfigs[ride.status as RideStatus];
            const StatusIcon = statusConfig?.icon || CheckCircle2;
            const pickedUpHistory = ride.statusHistory.find(
              (sh: any) => sh.updateStatus === "picked_up"
            );
            const completedHistory = ride.statusHistory.find(
              (sh: any) => sh.updateStatus === "completed"
            );
            const paidHistory = ride.statusHistory.find(
              (sh: any) => sh.updateStatus === "paid"
            );

            return (
              <Card
                key={ride._id}
                className="border border-border hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Ride Info */}
                    <div className="flex-1 space-y-4">
                      {/* Route */}
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center mt-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div className="w-0.5 h-6 bg-border mt-1"></div>
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div>
                            <div className="text-sm font-medium text-card-foreground">
                              Pickup
                            </div>
                            <div className="text-muted-foreground">
                              {ride.pickupLocation.address}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-card-foreground">
                              Destination
                            </div>
                            <div className="text-muted-foreground">
                              {ride.destinationLocation.address}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Rider Info */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="font-semibold text-card-foreground">
                          {ride.rider?.name || "Unknown Rider"}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {ride.rider?.phone || "N/A"}
                        </div>
                      </div>
                    </div>

                    {/* Status & Timeline */}
                    <div className="space-y-4 min-w-[200px]">
                      {/* Status Badge */}
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`${statusConfig?.bgColor} ${statusConfig?.color} flex items-center gap-1`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig?.label}
                        </Badge>
                        <div className="text-lg font-bold text-card-foreground">
                          ৳{ride?.fare?.toFixed(2) || "N/A"}
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-2 text-sm">
                        {pickedUpHistory && (
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <ListStart className="h-3 w-3" />
                              Start Trip
                            </span>
                            <span className="text-card-foreground">
                              {new Date(
                                pickedUpHistory.timestamp
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        )}
                        {completedHistory && (
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              Completed
                            </span>
                            <span className="text-card-foreground">
                              {new Date(
                                completedHistory.timestamp
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        )}
                        {paidHistory && (
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              Paid
                            </span>
                            <span className="text-card-foreground">
                              {new Date(
                                paidHistory.timestamp
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-2 border-t border-border">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Date
                          </span>
                          <span className="text-card-foreground">
                            {new Date(ride.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * 5 + 1} to{" "}
              {Math.min(currentPage * 5, pagination.total)} of{" "}
              {pagination.total} rides
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
      </div>
    </div>
  );
}
