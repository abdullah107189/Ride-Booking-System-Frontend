import { useState } from "react";
import { MapPin, Navigation, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Types
interface Ride {
  _id: string;
  rider: string;
  driver: string | null;
  pickupLocation: {
    location: {
      type: string;
      coordinates: [number, number];
    };
    address: string;
  };
  destinationLocation: {
    location: {
      type: string;
      coordinates: [number, number];
    };
    address: string;
  };
  status:
    | "requested"
    | "accepted"
    | "picked_up"
    | "in_transit"
    | "completed"
    | "canceled"
    | "paid";
  statusHistory: Array<{
    updateStatus: string;
    timestamp: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

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

// RideCard Component
function RideCard({
  ride,
  onAccept,
}: {
  ride: Ride;
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
      <CardContent className="p-6">
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
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                <Navigation className="h-5 w-5 text-accent" />
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

// Sample Data
const SAMPLE_RIDES: Ride[] = [
  {
    _id: "68f8d70a020842514845abbd",
    rider: "68f8a6e4d18061cc6bf4ee01",
    driver: null,
    pickupLocation: {
      location: {
        type: "Point",
        coordinates: [90.412518, 23.810331],
      },
      address: "Cupiditate mollit de",
    },
    destinationLocation: {
      location: {
        type: "Point",
        coordinates: [90.408, 23.79],
      },
      address: "Id itaque sed repud",
    },
    status: "requested",
    statusHistory: [
      {
        updateStatus: "requested",
        timestamp: "2025-10-22T12:57:35.369Z",
      },
    ],
    createdAt: "2025-10-22T13:07:22.230Z",
    updatedAt: "2025-10-22T13:07:22.230Z",
  },
];

// Main Component
export default function AvailableRides() {
  const [rides] = useState<Ride[]>(SAMPLE_RIDES);

  const handleAcceptRide = (rideId: string) => {
    toast("Ride Accepted!", rideId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Available Rides
          </h1>
          <p className="text-muted-foreground">
            {rides.length} {rides.length === 1 ? "ride" : "rides"} available
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rides.map((ride) => (
            <RideCard key={ride._id} ride={ride} onAccept={handleAcceptRide} />
          ))}
        </div>
      </div>
    </div>
  );
}
