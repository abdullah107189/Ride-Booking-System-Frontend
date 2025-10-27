/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import {
  Car,
  DollarSign,
  Star,
  TrendingUp,
  MapPin,
  Navigation,
  History,
  User,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  useGetRiderStatsQuery,
  useGetRidesByRiderQuery,
} from "@/redux/features/ride/ride.api";

export function RiderOverview() {
  const { data: rides, isLoading } = useGetRidesByRiderQuery(undefined);
  const { data: statsData, isLoading: riderStatusLoading } =
    useGetRiderStatsQuery(undefined);

  if (isLoading || riderStatusLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Calculate stats from actual data

  const stats = {
    totalRides: statsData?.data?.totalRides || 0,
    completedRides: statsData?.data?.completedRides || 0,
    totalSpent: statsData?.data?.totalSpent || 0,
    thisMonthRides: statsData?.data?.thisMonthRides || 0,
    favoriteDestination: statsData?.data?.favoriteDestination || "No rides yet",
    monthlyData: statsData?.data?.monthlyData || [],
  };

  // Get ongoing ride
  const ONGOING_STATUSES = ["requested", "accepted", "picked_up", "in_transit"];
  const isOngoing = rides && ONGOING_STATUSES.includes(rides.status);
  const ongoingRide = isOngoing ? rides : undefined;

  return (
    <div className="space-y-6">
      <PageHeader title="Rider Dashboard" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Rides
                </p>
                <p className="text-2xl font-bold">{stats.totalRides}</p>
              </div>
              <Car className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Spent
                </p>
                <p className="text-2xl font-bold">৳{stats.totalSpent}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completed
                </p>
                <p className="text-2xl font-bold">{stats.completedRides}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  This Month
                </p>
                <p className="text-2xl font-bold">{stats.thisMonthRides}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ongoing Ride */}
          {ongoingRide && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-blue-500" />
                  Ongoing Ride
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">From</span>
                    <span className="font-medium">
                      {ongoingRide.pickupLocation.address}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To</span>
                    <span className="font-medium">
                      {ongoingRide.destinationLocation.address}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="secondary" className="capitalize">
                      {ongoingRide.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <Button asChild className="w-full">
                    <Link to="/rider/tracking">
                      <Navigation className="h-4 w-4 mr-2" />
                      Track Ride
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link to="/rider/book-ride">
                  <Car className="h-4 w-4 mr-2" />
                  Book New Ride
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link to="/rider/ride-history">
                  <History className="h-4 w-4 mr-2" />
                  Ride History
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link to="/rider/profile">
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Popular Destinations */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Destinations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Home to Office
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Office to Home
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Current to Airport
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
