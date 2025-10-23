/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  User,
  Phone,
  Car,
  Navigation,
  CheckCircle2,
  Circle,
  CircleDashed,
  Package,
  CreditCard,
  Shield,
} from "lucide-react";
import { useGetRidesByDriverQuery } from "@/redux/features/driver/driver.api";

type RideStatus =
  | "requested"
  | "accepted"
  | "picked_up"
  | "in_transit"
  | "completed"
  | "paid";

const statusConfigs = {
  requested: {
    label: "Requested",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  accepted: {
    label: "Driver Accepted",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  picked_up: {
    label: "Picked Up",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  in_transit: {
    label: "In Transit",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  completed: {
    label: "Completed",
    color: "text-green-600",
    bgColor: "bg-green-600/10",
  },
  paid: {
    label: "Paid",
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
  },
};

const statusSteps = [
  {
    key: "requested" as RideStatus,
    label: "Ride Requested",
    icon: CircleDashed,
  },
  { key: "accepted" as RideStatus, label: "Driver Accepted", icon: Circle },
  { key: "picked_up" as RideStatus, label: "Picked Up", icon: Package },
  { key: "in_transit" as RideStatus, label: "In Transit", icon: Car },
  { key: "completed" as RideStatus, label: "Completed", icon: CheckCircle2 },
  { key: "paid" as RideStatus, label: "Paid", icon: CreditCard },
];

export function DriverTracking() {
  const { data: ride, isLoading } = useGetRidesByDriverQuery(undefined);
  console.log(ride);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!ride) {
    return <div>Ride not found</div>;
  }

  const currentStatus = ride.status as RideStatus;
  const statusConfig = statusConfigs[currentStatus];

  return (
    <div className="bg-gradient-to-br from-background to-muted min-h-screen">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Ride in Progress
          </h1>
          <Badge
            className={`${statusConfig.bgColor} ${statusConfig.color} text-lg py-2 px-4`}
          >
            {statusConfig.label}
          </Badge>
          <div className="mt-2 text-2xl font-semibold text-muted-foreground">
            Rider : {ride?.rider?.name}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Ride Info & Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  Ride Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusSteps.map((step, index) => {
                    const isCompleted =
                      statusSteps.findIndex((s) => s.key === currentStatus) >=
                      index;
                    const isCurrent = step.key === currentStatus;
                    const Icon = step.icon;
                    const statusHistoryItem = ride.statusHistory.find(
                      (sh: any) => sh.updateStatus === step.key
                    );

                    return (
                      <div key={step.key} className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          } ${
                            isCurrent ? "ring-2 ring-primary ring-offset-2" : ""
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div
                            className={`font-medium ${
                              isCompleted
                                ? "text-card-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {step.label}
                          </div>
                          {statusHistoryItem && (
                            <div className="text-sm text-muted-foreground">
                              {new Date(
                                statusHistoryItem.timestamp
                              ).toLocaleTimeString()}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Route Information */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-primary" />
                  Route
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-card-foreground">
                      Pickup
                    </div>
                    <div className="text-muted-foreground">
                      {ride.pickupLocation.address}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-card-foreground">
                      Destination
                    </div>
                    <div className="text-muted-foreground">
                      {ride.destinationLocation.address}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Rider & Actions */}
          <div className="space-y-6">
            {/* Rider Information */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Rider Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground mb-1">
                      {ride.rider.name}
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {ride.rider.phone}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {ride.rider.email}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Rider
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Safety
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Driver Actions */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  Driver Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {currentStatus === "accepted" && (
                  <>
                    <Button className="w-full" variant="outline">
                      <Package className="h-4 w-4 mr-2" />
                      Mark as Picked Up
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Car className="h-4 w-4 mr-2" />
                      Start Trip
                    </Button>
                  </>
                )}
                {currentStatus === "picked_up" && (
                  <Button className="w-full" variant="outline">
                    <Car className="h-4 w-4 mr-2" />
                    Start Trip
                  </Button>
                )}
                {currentStatus === "in_transit" && (
                  <Button className="w-full" variant="default">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Complete Ride
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Ride Information */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  Ride Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Requested:</span>
                  <span className="font-medium">
                    {new Date(ride.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="font-medium">
                    {new Date(ride.updatedAt).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status Updates:</span>
                  <span className="font-medium">
                    {ride.statusHistory.length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Placeholder */}
        <Card className="mt-8 border border-border">
          <CardContent className="p-6">
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  Live map would be integrated here
                </p>
                <p className="text-sm text-muted-foreground">
                  Showing route from {ride.pickupLocation.address} to{" "}
                  {ride.destinationLocation.address}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
