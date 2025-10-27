/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  User,
  Calendar,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetRideHistoryQuery } from "@/redux/features/ride/ride.api";

export function RideHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [minFare, setMinFare] = useState<number>(0);
  const [maxFare, setMaxFare] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 5;

  // RTK Query with pagination parameters
  const { data: ridesData, isLoading } = useGetRideHistoryQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter !== "all" ? statusFilter : undefined,
    search: searchQuery || undefined,
    startDate: dateFilter || undefined,
    minFare: minFare || undefined,
    maxFare: maxFare || undefined,
  });
  console.log(ridesData);

  const rides = ridesData?.data || [];
  const pagination = ridesData?.pagination || {
    page: 1,
    limit: itemsPerPage,
    total: 0,
    totalPages: 1,
  };

  const getStatusBadge = (status: string) => {
    const configs: any = {
      completed: {
        label: "Completed",
        variant: "default" as const,
        className: "bg-green-500/10 text-green-600",
      },
      paid: {
        label: "Paid",
        variant: "default" as const,
        className: "bg-blue-500/10 text-blue-600",
      },
      in_transit: {
        label: "In Transit",
        variant: "secondary" as const,
        className: "bg-yellow-500/10 text-yellow-600",
      },
      picked_up: {
        label: "Picked Up",
        variant: "secondary" as const,
        className: "bg-purple-500/10 text-purple-600",
      },
      accepted: {
        label: "Accepted",
        variant: "secondary" as const,
        className: "bg-orange-500/10 text-orange-600",
      },
      requested: {
        label: "Requested",
        variant: "outline" as const,
        className: "bg-gray-500/10 text-gray-600",
      },
      canceled: {
        label: "Canceled",
        variant: "destructive" as const,
        className: "bg-red-500/10 text-red-600",
      },
    };
    return (
      configs[status] || {
        label: status,
        variant: "outline" as const,
        className: "bg-gray-500/10 text-gray-600",
      }
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setStatusFilter("all");
    setDateFilter("");
    setMinFare(0);
    setMaxFare(0);
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Check if any filter is active
  const hasActiveFilters =
    statusFilter !== "all" || dateFilter || minFare || maxFare || searchQuery;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Ride History" />

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>
              Your Rides ({pagination.total})
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
                {dateFilter && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Date: {dateFilter}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setDateFilter("")}
                    />
                  </Badge>
                )}
                {(minFare || maxFare) && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Fare: {minFare || 0} - {maxFare || "∞"}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => {
                        setMinFare(0);
                        setMaxFare(0);
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
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by location or driver..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
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
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <Card className="p-4 border-dashed">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Status Filter */}

                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      Status
                    </label>
                    <Select
                      value={statusFilter}
                      onValueChange={(value) => {
                        setStatusFilter(value);
                        setCurrentPage(1);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="in_transit">In Transit</SelectItem>
                        <SelectItem value="picked_up">Picked Up</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="requested">Requested</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={dateFilter}
                      onChange={(e) => {
                        setDateFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="text-sm"
                    />
                  </div>

                  {/* Min Fare */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Min Fare (৳)
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={minFare}
                      onChange={(e) => {
                        setMinFare(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="text-sm"
                    />
                  </div>

                  {/* Max Fare */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Max Fare (৳)
                    </label>
                    <Input
                      type="number"
                      placeholder="1000"
                      value={maxFare}
                      onChange={(e) => {
                        setMaxFare(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="text-sm"
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Ride History List */}
            <div className="space-y-3">
              {rides.length > 0 ? (
                rides.map((ride: any) => {
                  const statusBadge = getStatusBadge(ride.status);

                  return (
                    <Card
                      key={ride._id}
                      className="p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <MapPin className="h-4 w-4 text-green-500" />
                            <span className="font-medium text-sm">
                              {ride.pickupLocation.address}
                            </span>
                            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                            <MapPin className="h-4 w-4 text-red-500" />
                            <span className="font-medium text-sm">
                              {ride.destinationLocation.address}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(ride.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />৳{ride.fare}
                            </span>
                            {ride.driver && (
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {ride.driver.name}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={statusBadge.variant}
                            className={`capitalize ${statusBadge.className}`}
                          >
                            {statusBadge.label}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No rides found</p>
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="mt-2"
                    >
                      Clear filters to see all rides
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, pagination.total)} of{" "}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
