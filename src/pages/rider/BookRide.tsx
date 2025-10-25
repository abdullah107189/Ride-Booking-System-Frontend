import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { SimpleRideRequestForm } from "@/components/dashboard/admin/RideRequest";

export function BookRide() {
  return (
    <div className="space-y-6">
      <PageHeader title="Book a Ride" />

      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <SimpleRideRequestForm />
        </CardContent>
      </Card>
    </div>
  );
}
