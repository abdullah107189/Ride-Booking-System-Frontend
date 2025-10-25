/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/shared/PageHeader";
// import { useGetRiderRidesQuery } from "@/redux/features/rider/rider.api";
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  User,
  Calendar,
  ArrowUpDown,
} from "lucide-react";
import { useGetRideHistoryQuery } from "@/redux/features/ride/ride.api";

export function RideHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: ridesData, isLoading } = useGetRideHistoryQuery(undefined);
  const rides = ridesData?.data || [];

  const getStatusBadge = (status: string) => {
    const configs: any = {
      completed: { label: "Completed", variant: "default" as const },
      paid: { label: "Paid", variant: "default" as const },
      in_transit: { label: "In Transit", variant: "secondary" as const },
      picked_up: { label: "Picked Up", variant: "secondary" as const },
      accepted: { label: "Accepted", variant: "secondary" as const },
      requested: { label: "Requested", variant: "outline" as const },
    };
    return configs[status] || { label: status, variant: "outline" as const };
  };

  const filteredRides = rides.filter((ride: any) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      ride.pickupLocation.address.toLowerCase().includes(searchLower) ||
      ride.destinationLocation.address.toLowerCase().includes(searchLower) ||
      (ride.driver?.name &&
        ride.driver.name.toLowerCase().includes(searchLower))
    );
  });

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
          <CardTitle>Your Rides ({filteredRides.length})</CardTitle>
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Ride History List */}
            <div className="space-y-3">
              {filteredRides.length > 0 ? (
                filteredRides.map((ride: any) => {
                  const statusBadge = getStatusBadge(ride.status);

                  return (
                    <Card key={ride._id} className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-green-500" />
                            <span className="font-medium">
                              {ride.pickupLocation.address}
                            </span>
                            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                            <MapPin className="h-4 w-4 text-red-500" />
                            <span className="font-medium">
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
                            className="capitalize"
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
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
