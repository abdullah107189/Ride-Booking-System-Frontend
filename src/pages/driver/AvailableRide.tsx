/* eslint-disable @typescript-eslint/no-explicit-any */
import { RideCard } from "@/components/modules/driver/RideCard";
import {
  useAcceptRideMutation,
  useGetAvailableRidesQuery,
} from "@/redux/features/driver/driver.api";
import type { IRide } from "@/types/ride";
import { useNavigate } from "react-router";
import { toast } from "sonner";

// Sample Data
// const SAMPLE_RIDES: IRide[] = [
//   {
//     _id: "68f8d70a020842514845abbd",
//     rider: "68f8a6e4d18061cc6bf4ee01",
//     driver: null,
//     pickupLocation: {
//       location: {
//         type: "Point",
//         coordinates: [90.412518, 23.810331],
//       },
//       address: "Cupiditate mollit de",
//     },
//     destinationLocation: {
//       location: {
//         type: "Point",
//         coordinates: [90.408, 23.79],
//       },
//       address: "Id itaque sed repud",
//     },
//     status: "requested",
//     statusHistory: [
//       {
//         updateStatus: "requested",
//         timestamp: "2025-10-22T12:57:35.369Z",
//       },
//     ],
//     createdAt: "2025-10-22T13:07:22.230Z",
//     updatedAt: "2025-10-22T13:07:22.230Z",
//   },
// ];
// Main Component
export default function AvailableRides() {
  const { data: availableRides, isLoading: availableRidesLoading } =
    useGetAvailableRidesQuery(undefined);
  console.log(availableRides);
  const navigate = useNavigate();

  const [acceptRide, { isLoading: acceptRideLoading }] =
    useAcceptRideMutation();

  if (availableRidesLoading) {
    return <div>Loading...</div>;
  }
  const handleAcceptRide = async (rideId: string) => {
    try {
      const res = await acceptRide(rideId).unwrap();
      console.log(res);
      toast(res?.message || "Ride Accepted!");
      navigate(`/driver/tracked-rides`);
    } catch (error) {
      console.log(error);
      const errorTyped = error as any;
      toast.error(
        errorTyped?.data?.message ||
          "Failed to accept the ride. Please try again."
      );
    }
  };

  return (
    <div className=" bg-gradient-to-br from-background via-background to-primary/5">
      <div className="">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Available Rides
          </h1>
          <p className="text-muted-foreground">
            {availableRides.length}{" "}
            {availableRides.length === 1 ? "ride" : "rides"} available
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableRides.map((ride: IRide) => (
            <RideCard
              key={ride._id}
              acceptRideLoading={acceptRideLoading}
              ride={ride}
              onAccept={handleAcceptRide}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
