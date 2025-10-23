import { RideCard } from "@/components/modules/driver/RideCard";
import { useGetAvailableRidesQuery } from "@/redux/features/driver/driver.api";
import type { IRide } from "@/types/ride";
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
  if (availableRidesLoading) {
    return <div>Loading...</div>;
  }

  const handleAcceptRide = (rideId: string) => {
    console.log(rideId);
    toast("Ride Accepted!");
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
            <RideCard key={ride._id} ride={ride} onAccept={handleAcceptRide} />
          ))}
        </div>
      </div>
    </div>
  );
}
