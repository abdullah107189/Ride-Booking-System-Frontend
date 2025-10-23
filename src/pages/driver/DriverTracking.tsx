/* eslint-disable @typescript-eslint/no-explicit-any */
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
  History,
  Clock,
} from "lucide-react";
import {
  useCompleteRideMutation,
  useGetRidesByDriverQuery,
  useMakeTransitTripMutation,
  useMarkAsPaidMutation,
  useMarkAsPickedUpMutation,
} from "@/redux/features/driver/driver.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { PageHeader } from "@/components/shared/PageHeader";

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
  const navigate = useNavigate();
  // Initialize all mutations
  const [markAsPickedUp, { isLoading: isPickingUp }] =
    useMarkAsPickedUpMutation();
  const [makeTransitTrip, { isLoading: isTransit }] =
    useMakeTransitTripMutation();
  const [completeRide, { isLoading: isCompleting }] = useCompleteRideMutation();
  const [markAsPaid, { isLoading: isMarkingPaid }] = useMarkAsPaidMutation();

  const {
    data: ride,
    isLoading,
    refetch,
  } = useGetRidesByDriverQuery(undefined);

  console.log(ride);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // ... your existing imports and code ...

  if (!ride) {
    return (
      <div className="">
        {/* Header */}
        <PageHeader title="Ride Tracking"></PageHeader>

        <div className="grid lg:grid-cols-2 gap-8 mt-4">
          {/* Left Side - Illustration & Main Message */}
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative">
              <div className="w-48 h-48 bg-primary/10 rounded-full flex items-center justify-center">
                <Car className="h-24 w-24 text-primary/60" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                No Active Rides
              </h2>
              <p className="text-xl text-muted-foreground max-w-md">
                You're online and ready to accept ride requests
              </p>
              <div className="flex items-center justify-center gap-2 text-green-600">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Online and Available</span>
              </div>
            </div>

            <Button
              size="lg"
              className="mt-4"
              onClick={() => navigate("/driver/available-rides")}
            >
              <User className="h-5 w-5 mr-2" />
              Go to Available Rides
            </Button>
          </div>

          {/* Right Side - Stats & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate("/driver/ride-history")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    View Earnings History
                  </Button>
                  <Button
                    onClick={() => navigate("/updateProfile")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border border-dashed border-yellow-200 bg-yellow-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  💡 Tips for More Rides
                </h3>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    Stay in high-demand areas during peak hours
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    Keep your vehicle clean and well-maintained
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    Maintain a high rating for better matching
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - What to Expect */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="border border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                What happens when you get a ride request?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-card-foreground">
                    1. Notification
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    You'll get an instant notification with ride details
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-card-foreground">
                    2. Accept & Navigate
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Accept the ride and navigate to pickup location
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <User className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-card-foreground">
                    3. Complete & Earn
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Complete the ride and get paid instantly
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // status chnage function

  // Define error type
  type ApiError = {
    data?: {
      message?: string;
    };
  };

  const handleMarkAsPickedUp = async (rideId: string) => {
    try {
      console.log("rideId", rideId);
      const res = await markAsPickedUp(rideId).unwrap();
      console.log(res);
      toast.success(res?.message || "Rider picked up successfully!");
      refetch();
    } catch (error: unknown) {
      console.log(error);
      const errorMessage =
        (error as ApiError)?.data?.message ||
        "Failed to mark as picked up. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleMakeTransit = async (rideId: string) => {
    try {
      const res = await makeTransitTrip(rideId).unwrap();
      console.log(res);
      toast.success(res?.message || "Trip started successfully!");
      refetch();
    } catch (error: unknown) {
      console.log(error);
      const errorMessage =
        (error as ApiError)?.data?.message ||
        "Failed to start trip. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleCompleteRide = async (rideId: string) => {
    try {
      const res = await completeRide(rideId).unwrap();
      console.log(res);
      toast.success(res?.message || "Ride completed successfully!");
      refetch();
    } catch (error: unknown) {
      console.log(error);
      const errorMessage =
        (error as ApiError)?.data?.message ||
        "Failed to complete ride. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleMarkAsPaid = async (rideId: string) => {
    try {
      const res = await markAsPaid(rideId).unwrap();
      console.log(res);
      toast.success(res?.message || "Payment confirmed!");
      refetch();
    } catch (error: unknown) {
      console.log(error);
      const errorMessage =
        (error as ApiError)?.data?.message ||
        "Failed to mark as paid. Please try again.";
      toast.error(errorMessage);
    }
  };

  const currentStatus = ride.status as RideStatus;
  const statusConfig = statusConfigs[currentStatus];
  const isAnyLoading =
    isPickingUp || isTransit || isCompleting || isMarkingPaid;
  return (
    <div className="">
      <div className="px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <PageHeader title="Ride in Progress"></PageHeader>
          <Badge
            className={`${statusConfig.bgColor} ${statusConfig.color} text-lg py-2 px-4 mt-3`}
          >
            {statusConfig.label}
            {isAnyLoading && " (Updating...)"}
          </Badge>
          <div className="mt-2 text-muted-foreground">
            Cost : {ride?.fare} Taka
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
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() =>
                        ride?._id && handleMarkAsPickedUp(ride?._id)
                      }
                      disabled={isPickingUp}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      {isPickingUp ? "Updating..." : "Start Trip / Picked Up"}
                    </Button>
                  </>
                )}

                {currentStatus === "picked_up" && (
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => ride?._id && handleMakeTransit(ride?._id)}
                    disabled={isTransit}
                  >
                    <Car className="h-4 w-4 mr-2" />
                    {isTransit ? "Starting..." : "Start Trip"}
                  </Button>
                )}

                {currentStatus === "in_transit" && (
                  <Button
                    className="w-full"
                    variant="default"
                    onClick={() => ride?._id && handleCompleteRide(ride?._id)}
                    disabled={isCompleting}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    {isCompleting ? "Completing..." : "Complete Ride"}
                  </Button>
                )}

                {currentStatus === "completed" && (
                  <Button
                    className="w-full"
                    variant="default"
                    onClick={() => ride?._id && handleMarkAsPaid(ride?._id)}
                    disabled={isMarkingPaid}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {isMarkingPaid ? "Updating..." : "Mark as Paid"}
                  </Button>
                )}

                {currentStatus === "paid" && (
                  <div className="text-center text-green-600 font-medium">
                    Ride Completed Successfully!
                  </div>
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
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground flex items-center gap-2">
                    <History className="h-5 w-5 text-primary" />
                    Status History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Timeline */}
                  <div className="space-y-3">
                    {ride.statusHistory.map(
                      (
                        history: { updateStatus: string; timestamp: any },
                        index: number
                      ) => {
                        const statusConfig =
                          statusConfigs[history.updateStatus as RideStatus];
                        const isLast = index === ride.statusHistory.length - 1;

                        const rawTimestamp =
                          history.timestamp?.$date || history.timestamp;

                        return (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex flex-col items-center mt-1">
                              <div
                                className={`w-2 h-2 rounded-full ${statusConfig?.bgColor} ${statusConfig?.color}`}
                              />
                              {!isLast && (
                                <div className="w-0.5 h-6 bg-border mt-1" />
                              )}
                            </div>

                            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <span className="text-sm font-medium text-card-foreground">
                                {statusConfig?.label || history.updateStatus}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(rawTimestamp).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-3 pt-4 mt-4 border-t border-border">
                    <div className="text-center">
                      <div className="font-semibold text-card-foreground">
                        {ride.statusHistory.length}
                      </div>
                      <div className="text-xs text-muted-foreground">Steps</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-card-foreground">
                        {new Date(ride.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Started
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-card-foreground">
                        {new Date(ride.updatedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Updated
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
