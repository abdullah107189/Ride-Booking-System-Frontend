import { useState } from "react";
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  User,
  Phone,
  Star,
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

const mockRideData = {
  _id: "68f9c49e6859c5cd6c64db22",
  rider: {
    _id: "68f9b732e0f469a0192ce1bb",
    name: "John Rider",
    phone: "+8801XXXXXXX",
    rating: 4.5,
  },
  driver: {
    _id: "68f9ac7fe0f469a0192ce19a",
    name: "Abdul Karim",
    phone: "+8801XXXXXXX",
    rating: 4.8,
    vehicleInfo: {
      model: "Toyota Corolla",
      licensePlate: "DHA-12345",
      carType: "sedan",
    },
  },
  pickupLocation: {
    address: "Uttara, Dhaka",
    location: {
      coordinates: [90.412518, 23.810331],
    },
  },
  destinationLocation: {
    address: "Banani, Dhaka",
    location: {
      coordinates: [90.408, 23.79],
    },
  },
  status: "accepted",
  fare: 180,
  statusHistory: [
    { updateStatus: "requested", timestamp: "2025-10-23T05:26:46.708Z" },
    { updateStatus: "accepted", timestamp: "2025-10-23T06:01:08.403Z" },
  ],
  createdAt: "2025-10-23T06:01:02.686Z",
};

type RideStatus =
  | "requested"
  | "accepted"
  | "picked_up"
  | "in_transit"
  | "completed"
  | "paid";

export function RideTracking() {
  const { data: getRidesInfo } = useGetRidesByDriverQuery(undefined);
  console.log(getRidesInfo);
  const { rideId } = useParams();
  const [ride, setRide] = useState(mockRideData);
  const [currentStatus, setCurrentStatus] = useState<RideStatus>(
    ride.status as RideStatus
  );
  const [driverLocation, setDriverLocation] = useState<[number, number] | null>(
    null
  );

  const getStatusConfig = (status: RideStatus) => {
    const configs = {
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
    return configs[status];
  };

  const statusConfig = getStatusConfig(currentStatus);

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

  return (
    <div className="bg-gradient-to-br from-background to-muted ">
      <div className="px-4">
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
          <div className="mt-2 text-muted-foreground">Ride ID: {rideId}</div>
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
                          {ride.statusHistory.find(
                            (sh) => sh.updateStatus === step.key
                          ) && (
                            <div className="text-sm text-muted-foreground">
                              {new Date(
                                ride.statusHistory.find(
                                  (sh) => sh.updateStatus === step.key
                                )!.timestamp
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
                  <div className="w-3 h-3 bg-chart-2 rounded-full mt-2"></div>
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
                  <div className="w-3 h-3 bg-chart-1 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-card-foreground">
                      Destination
                    </div>
                    <div className="text-muted-foreground">
                      {ride.destinationLocation.address}
                    </div>
                  </div>
                </div>

                {/* Estimated Info */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-card-foreground">
                      8 min
                    </div>
                    <div className="text-sm text-muted-foreground">ETA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-card-foreground">
                      ৳{ride.fare}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Estimated Fare
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Driver & Actions */}
          <div className="space-y-6">
            {/* Driver Information */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Your Driver
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-card-foreground">
                        {ride.driver.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {ride.driver.rating}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {ride.driver.vehicleInfo.model} •{" "}
                      {ride.driver.vehicleInfo.licensePlate}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {driverLocation ? "2.1 km away" : "Location updating..."}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Safety
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions - For Driver Only */}
            {currentStatus === "accepted" && (
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">
                    Driver Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    Mark as Picked Up
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Car className="h-4 w-4 mr-2" />
                    Start Trip
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Safety Features */}
            <Card className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Shield className="h-4 w-4" />
                  <span>Safety First</span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• Share your ride status with emergency contacts</div>
                  <div>• Your route is being tracked in real-time</div>
                  <div>• 24/7 customer support available</div>
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
