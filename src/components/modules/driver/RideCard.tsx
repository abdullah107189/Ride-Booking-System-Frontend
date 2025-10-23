// RideCard Component

import { MapPin, Navigation, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { IRide } from "@/types/ride";

// Utils
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const formatDistance = (km: number): string => {
  return km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`;
};

const estimateTime = (km: number): string => {
  const minutes = Math.round((km / 40) * 60);
  return minutes < 60
    ? `${minutes} min`
    : `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

const formatRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

export function RideCard({
  ride,
  acceptRideLoading,
  onAccept,
}: {
  ride: IRide;
  acceptRideLoading: boolean;
  onAccept: (rideId: string) => void;
}) {
  const distance = calculateDistance(
    ride.pickupLocation.location.coordinates[1],
    ride.pickupLocation.location.coordinates[0],
    ride.destinationLocation.location.coordinates[1],
    ride.destinationLocation.location.coordinates[0]
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "requested":
        return "bg-accent text-accent-foreground";
      case "accepted":
        return "bg-primary text-primary-foreground";
      case "in_progress":
        return "bg-primary text-primary-foreground";
      case "completed":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="group transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] border-border bg-card">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(ride.status)}>
              {ride.status.replace("_", " ").toUpperCase()}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatRelativeTime(ride.createdAt)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Pickup
                </p>
                <p className="text-base font-semibold text-foreground">
                  {ride.pickupLocation.address}
                </p>
              </div>
            </div>

            <div className="ml-5 border-l-2 border-dashed border-border pl-8 py-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>{formatDistance(distance)}</span>
                <span>•</span>
                <span>{estimateTime(distance)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
                <Navigation className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Destination
                </p>
                <p className="text-base font-semibold text-foreground">
                  {ride.destinationLocation.address}
                </p>
              </div>
            </div>
          </div>

          {ride.status === "requested" && (
            <Button
              onClick={() => onAccept(ride._id)}
              disabled={acceptRideLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              size="lg"
            >
              Accept Ride
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
