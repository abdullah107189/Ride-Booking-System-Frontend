/* eslint-disable @typescript-eslint/no-explicit-any */
import { RideCard } from "@/components/modules/driver/RideCard";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  driverApi,
  useAcceptRideMutation,
  useGetAvailableRidesQuery,
} from "@/redux/features/driver/driver.api";
import type { IRide } from "@/types/ride";
import { Car, MapPin } from "lucide-react";
import { useDispatch } from "react-redux";
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

  const dispatch = useDispatch();
  const handleAcceptRide = async (rideId: string) => {
    try {
      const res = await acceptRide(rideId).unwrap();
      console.log(res);
      toast(res?.message || "Ride Accepted!");
      dispatch(driverApi.util.resetApiState());
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

  if (availableRidesLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" bg-gradient-to-br from-background via-background to-primary/5">
      <PageHeader title="Available Rides"></PageHeader>
      <div className="flex items-center justify-end mt-2 mb-6">
        <div className="flex items-center gap-2 rounded-2xl bg-primary/10 px-4 py-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span>{availableRides.length}</span>
          Available
        </div>
      </div>
      <main className="mxw py-8">
        {availableRides.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Car className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              No rides available
            </h2>
            <p className="text-muted-foreground">
              Check back soon for new ride requests in your area
            </p>
          </div>
        ) : (
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
        )}
      </main>
    </div>
  );
}
