/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Clock,
  Calendar,
  DollarSign,
  Star,
  Car,
  CheckCircle2,
  Phone,
  ListStart,
} from "lucide-react";
import { useGetDriverRideHistoryQuery } from "@/redux/features/driver/driver.api";
import { PageHeader } from "@/components/shared/PageHeader";

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
  const {
    data: rides,
    isLoading,
    error,
  } = useGetDriverRideHistoryQuery(undefined);

  console.log(rides);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading ride history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load ride history</p>
        </div>
      </div>
    );
  }

  if (!rides || rides.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No Ride History
            </h2>
            <p className="text-muted-foreground">
              Your completed rides will appear here
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Ride History
          </h1>
          <p className="text-muted-foreground text-lg">
            Your completed and paid rides
          </p>
          <PageHeader title="Ride History"></PageHeader>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border border-border">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-foreground mb-2">
                {rides.length}
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
                ৳
                {rides.reduce(
                  (total: number, ride: any) => total + (ride.fare || 0),
                  0
                )}
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

        {/* Ride History List */}
        <div className="grid gap-6">
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
                        <div>
                          <div className="font-semibold text-card-foreground">
                            {ride.rider.name}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {ride.rider.phone}
                          </div>
                          {ride.rider.rating && (
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-muted-foreground">
                                {ride.rider.rating}
                              </span>
                            </div>
                          )}
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
                          ৳{ride?.totalEarnings}
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

        {/* Empty State for Mobile */}
        {rides.length === 0 && (
          <Card className="border border-border">
            <CardContent className="p-8 text-center">
              <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No rides completed yet
              </h3>
              <p className="text-muted-foreground">
                Your completed and paid rides will appear here
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
