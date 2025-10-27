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
  Clock,
  Star,
  Shield,
  Repeat,
  RefreshCw,
  X,
  HistoryIcon,
} from "lucide-react";
import { useNavigate } from "react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  useCancelRideMutation,
  useGetRidesByRiderQuery,
} from "@/redux/features/ride/ride.api";
import { toast } from "sonner";

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

export function RiderTracking() {
  const navigate = useNavigate();

  const { data: ride, isLoading, refetch } = useGetRidesByRiderQuery(undefined);
  const [cancelRide, { isLoading: isCanceling }] = useCancelRideMutation();
  if (isLoading) {
    return <div>Loading ride status...</div>;
  }
  if (!ride) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <PageHeader title="Ride Tracking"></PageHeader>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mxw">
          {/* Left Side - Illustration & Message */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/30">
            <CardContent className="p-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="h-16 w-16 text-primary/60" />
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ready to Ride?
              </h2>
              <p className="text-muted-foreground mb-6">
                Your ride dashboard is waiting for your next journey. Book a
                ride and track every step of your trip here.
              </p>

              <Button
                onClick={() => navigate("/rider/book-ride")}
                size="lg"
                className="w-full"
              >
                <Car className="h-5 w-5 mr-2" />
                Book Your Ride Now
              </Button>
            </CardContent>
          </Card>

          {/* Right Side - Quick Actions */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate("/rider/ride-history")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <HistoryIcon className="h-4 w-4 mr-2" />
                    View Ride History
                  </Button>
                  <Button
                    onClick={() => navigate("/rider/favorites")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Favorite Locations
                  </Button>
                  <Button
                    onClick={() => navigate("/rider/payments")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Payment Methods
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border border-dashed border-primary/30 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  💡 Better Ride Experience
                </h3>
                <ul className="space-y-2 text-sm text-primary/80">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></div>
                    Set your pickup location accurately
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></div>
                    Choose the right vehicle type for your needs
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></div>
                    Have your payment method ready
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
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
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                No Active Rides
              </h2>
              <p className="text-xl text-muted-foreground max-w-md">
                Ready to book your next ride? Find a driver nearby!
              </p>
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Ready to Ride</span>
              </div>
            </div>

            <Button
              size="lg"
              className="mt-4"
              onClick={() => navigate("/rider/book-ride")}
            >
              <MapPin className="h-5 w-5 mr-2" />
              Book a New Ride
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
                    onClick={() => navigate("/rider/ride-history")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    View Ride History
                  </Button>
                  <Button
                    onClick={() => navigate("/rider/favorites")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Favorite Drivers
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border border-dashed border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  💡 Tips for Better Rides
                </h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                    Be ready at pickup location when driver arrives
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                    Confirm your destination with the driver
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                    Rate your driver after the ride
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - How It Works */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="border border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                How ride tracking works?
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-card-foreground">
                    1. Book Ride
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Enter your pickup and destination
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-card-foreground">
                    2. Driver Assigned
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Get matched with nearby driver
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Car className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-card-foreground">
                    3. Track Live
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    See driver location and ETA
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                    <Star className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-card-foreground">
                    4. Rate & Pay
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Complete ride and rate driver
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  const currentStatus = ride.status as RideStatus;
  const statusConfig = statusConfigs[currentStatus];

  if (!statusConfig) {
    console.error(`Status config missing for: ${currentStatus}`);
    return <div>Error: Invalid status configuration.</div>;
  }
  const isDriverDataAvailable =
    ride?.driver && Object.keys(ride.driver).length > 0;

  const handleCancelRide = async (rideId: string) => {
    try {
      await cancelRide(rideId).unwrap();
      toast.success("Ride cancelled successfully!");
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to cancel ride");
    }
  };

  const handleRateRide = async (rideId: string) => {
    // Open rating modal or navigate to rating page
    navigate(`/rate-ride/${rideId}`);
  };

  const handleBookAgain = (ride: any) => {
    // Pre-fill booking form with same details
    navigate("/book-ride", {
      state: {
        pickup: ride.pickupLocation,
        destination: ride.destinationLocation,
      },
    });
  };
  return (
    <div className="">
      {/* Header */}
      <div className="text-center mb-8">
        <PageHeader title="Your Ride in Progress"></PageHeader>
        <div className="flex items-center gap-4">
          <Badge
            className={`${statusConfig.bgColor} ${statusConfig.color} text-lg py-2 px-4 mt-3`}
          >
            {statusConfig.label}
          </Badge>

          <div className="mt-2 text-muted-foreground">
            Fare: {ride?.fare} Taka
          </div>

          {/* Action Buttons Based on Status */}
          <div className="flex gap-2 ml-auto">
            {currentStatus === "requested" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCancelRide(ride?._id)}
                disabled={isCanceling}
              >
                <X className="h-4 w-4 mr-2" />
                {isCanceling ? "Canceling..." : "Cancel Ride"}
              </Button>
            )}

            {currentStatus === "accepted" && (
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call Driver
              </Button>
            )}

            {currentStatus === "picked_up" && (
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-2" />
                Share Location
              </Button>
            )}

            {currentStatus === "in_transit" && (
              <Button variant="outline" size="sm">
                <Shield className="h-4 w-4 mr-2" />
                SOS
              </Button>
            )}

            {currentStatus === "completed" && (
              <Button
                variant="default"
                size="sm"
                onClick={() => handleRateRide(ride?._id)}
              >
                <Star className="h-4 w-4 mr-2" />
                Rate Ride
              </Button>
            )}

            {currentStatus === "paid" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBookAgain(ride)}
              >
                <Repeat className="h-4 w-4 mr-2" />
                Book Again
              </Button>
            )}

            {/* Always show refresh button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`grid gap-8 ${
          isDriverDataAvailable ? "lg:grid-cols-3" : "lg:grid-cols-2"
        }`}
      >
        {" "}
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
                Your Route
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-card-foreground">
                    Pickup Location
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
        {/* Right Column - Driver Info & Actions */}
        {isDriverDataAvailable && (
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
                {ride.driver ? (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-card-foreground mb-1">
                          {ride.driver.name}
                        </h3>
                        <div className="text-sm text-muted-foreground">
                          {ride.driver.phone}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-muted-foreground">
                            {ride.driver.rating || "4.8"} •{" "}
                            {ride.driver.totalTrips || "100+"} trips
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Info */}
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Car className="h-4 w-4 text-primary" />
                        <span className="font-medium text-card-foreground">
                          {ride.driver.vehicle?.model || "Toyota Corolla"}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {ride.driver.vehicle?.color || "White"} •{" "}
                        {ride.driver.vehicle?.licensePlate || "DHK-1234"}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <a
                        href={`tel:${ride?.drier?.number}`}
                        className="flex-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          className="w-full"
                          size="sm"
                          asChild
                        >
                          <span className="flex items-center justify-center">
                            <Phone className="h-4 w-4 mr-2" />
                            Call Driver
                          </span>
                        </Button>
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      Waiting for driver assignment...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Ride Information */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
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
                    <div className="text-xs text-muted-foreground">Started</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-card-foreground">
                      {new Date(ride.updatedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="text-xs text-muted-foreground">Updated</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ride Actions for Rider */}
            {currentStatus === "completed" && (
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">
                    Rate Your Ride
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-8 w-8 text-yellow-400 cursor-pointer hover:scale-110 transition-transform"
                      />
                    ))}
                  </div>
                  <Button className="w-full">
                    <Star className="h-4 w-4 mr-2" />
                    Submit Rating
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
