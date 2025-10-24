/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, Car, Eye, XCircle } from "lucide-react";
import { toast } from "sonner";
import {
  useCancelRideMutation,
  useGetAllRidesQuery,
} from "@/redux/features/admin/admin.api";

export function RidesManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: ridesData, isLoading } = useGetAllRidesQuery(undefined);
  const [cancelRide] = useCancelRideMutation();

  const rides = ridesData?.data || [];
  console.log(rides);
  const handleCancelRide = async (rideId: string) => {
    try {
      await cancelRide(rideId).unwrap();
      toast.success("Ride cancelled successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel ride");
    }
  };

  const getStatusConfig = (status: string) => {
    const configs: any = {
      requested: {
        color: "text-yellow-600",
        bgColor: "bg-yellow-500/10",
        label: "Requested",
      },
      accepted: {
        color: "text-blue-600",
        bgColor: "bg-blue-500/10",
        label: "Accepted",
      },
      picked_up: {
        color: "text-green-600",
        bgColor: "bg-green-500/10",
        label: "Picked Up",
      },
      in_transit: {
        color: "text-purple-600",
        bgColor: "bg-purple-500/10",
        label: "In Transit",
      },
      completed: {
        color: "text-green-600",
        bgColor: "bg-green-500/10",
        label: "Completed",
      },
      paid: {
        color: "text-gray-600",
        bgColor: "bg-gray-500/10",
        label: "Paid",
      },
      canceled: {
        color: "text-red-600",
        bgColor: "bg-red-500/10",
        label: "Canceled",
      },
    };
    return configs[status] || configs.requested;
  };

  const filteredRides =
    rides?.filter(
      (ride: any) =>
        ride.rider?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.driver?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.pickupLocation?.address
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        ride.destinationLocation?.address
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    ) || [];

  if (isLoading) {
    return (
      <Card className="border border-border">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading rides...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5 text-primary" />
          Rides Management ({filteredRides.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search rides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Rides Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ride Info</TableHead>
                <TableHead>Rider & Driver</TableHead>
                <TableHead>Fare</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRides.map((ride: any) => {
                const statusConfig = getStatusConfig(ride.status);
                return (
                  <TableRow key={ride._id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">
                          {ride.pickupLocation?.address}
                        </div>
                        <div className="text-sm text-muted-foreground">→</div>
                        <div className="font-medium text-foreground">
                          {ride.destinationLocation?.address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div>
                          <div className="text-sm font-medium">Rider:</div>
                          <div className="text-sm text-muted-foreground">
                            {ride.rider?.name || "N/A"}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Driver:</div>
                          <div className="text-sm text-muted-foreground">
                            {ride.driver?.name || "Not assigned"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-lg font-bold text-green-600">
                        ৳{ride.fare || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${statusConfig.bgColor} ${statusConfig.color}`}
                      >
                        {statusConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {new Date(ride.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(ride.createdAt).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {!["completed", "paid", "canceled"].includes(
                            ride.status
                          ) && (
                            <DropdownMenuItem
                              onClick={() => handleCancelRide(ride._id)}
                              className="text-red-600"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel Ride
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {filteredRides.length === 0 && (
          <div className="text-center py-8">
            <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No rides found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
