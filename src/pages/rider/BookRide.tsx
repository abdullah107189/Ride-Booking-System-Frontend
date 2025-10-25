import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { SimpleRideRequestForm } from "@/components/dashboard/admin/RideRequest";

export function BookRide() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Book a Ride" 
        description="Enter your pickup and destination locations to book a ride"
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Ride Information</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleRideRequestForm />
        </CardContent>
      </Card>
    </div>
  );
}