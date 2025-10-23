// components/ride/DriverActions.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, Car, CheckCircle2, CreditCard } from "lucide-react";

interface DriverActionsProps {
  currentStatus: string;
  onStatusUpdate: (status: string) => void;
  rideId: string;
}

export function DriverActions({
  currentStatus,
  onStatusUpdate,
  rideId,
}: DriverActionsProps) {
 

  const getAvailableActions = () => {
    switch (currentStatus) {
      case "accepted":
        return [
          {
            status: "picked_up",
            label: "Passenger Picked Up",
            icon: Package,
            variant: "default" as const,
          },
        ];
      case "picked_up":
        return [
          {
            status: "in_transit",
            label: "Start Trip",
            icon: Car,
            variant: "default" as const,
          },
        ];
      case "in_transit":
        return [
          {
            status: "completed",
            label: "Complete Ride",
            icon: CheckCircle2,
            variant: "default" as const,
          },
        ];
      case "completed":
        return [
          {
            status: "paid",
            label: "Mark as Paid",
            icon: CreditCard,
            variant: "default" as const,
          },
        ];
      default:
        return [];
    }
  };

  const actions = getAvailableActions();

  if (actions.length === 0) return null;

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Driver Actions</CardTitle>
        <CardDescription>Update ride status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action) => (
          <Button
            key={action.status}
           
            className="w-full"
            variant={action.variant}
          >
            <action.icon className="h-4 w-4 mr-2" />
            {action.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
