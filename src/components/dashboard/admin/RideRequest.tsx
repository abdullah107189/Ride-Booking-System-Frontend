/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ride/RideRequestForm.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  MapPin,
  Navigation,
  Car,
  Bike,
  Crown,
  CreditCard,
  Wallet,
  Clock,
  DollarSign,
  Users,
  Coins,
} from "lucide-react";

// Validation Schema
const rideRequestSchema = z.object({
  pickupAddress: z
    .string()
    .min(5, "Pickup address must be at least 5 characters"),
  destinationAddress: z
    .string()
    .min(5, "Destination address must be at least 5 characters"),
  vehicleType: z.enum(["car", "bike", "premium"]),
  paymentMethod: z.enum(["cash", "card", "mobile"]),
});

type RideFormData = z.infer<typeof rideRequestSchema>;

export function RideRequestForm() {
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<RideFormData>({
    resolver: zodResolver(rideRequestSchema),
    defaultValues: {
      pickupAddress: "",
      destinationAddress: "",
      vehicleType: "car",
      paymentMethod: "cash",
    },
  });

  // Mock fare calculation
  const calculateFare = async (data: RideFormData) => {
    setIsCalculating(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const baseFares = {
      bike: 80,
      car: 150,
      premium: 250,
    };

    const fare = baseFares[data.vehicleType] + Math.floor(Math.random() * 100);
    const time = 15 + Math.floor(Math.random() * 30);

    setEstimatedFare(fare);
    setEstimatedTime(time);
    setIsCalculating(false);
  };

  const onSubmit = async (data: RideFormData) => {
    try {
      // Simulate coordinates (in real app, use geocoding API)
      const pickupCoords: [number, number] = [90.412518, 23.810331];
      const destinationCoords: [number, number] = [90.408, 23.79];

      const rideRequest = {
        rider: "current-user-id", // This would come from auth context
        pickupLocation: {
          location: {
            type: "Point" as const,
            coordinates: pickupCoords,
          },
          address: data.pickupAddress,
        },
        destinationLocation: {
          location: {
            type: "Point" as const,
            coordinates: destinationCoords,
          },
          address: data.destinationAddress,
        },
        vehicleType: data.vehicleType,
        paymentMethod: data.paymentMethod,
      };

      console.log("Ride request:", rideRequest);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Ride booked successfully! 🚗", {
        description: `Driver is on the way. Estimated arrival: ${estimatedTime} minutes`,
      });

      form.reset();
      setEstimatedFare(null);
      setEstimatedTime(null);
    } catch (error: any) {
      toast.error("Failed to book ride", {
        description: "Please try again in a moment.",
      });
    }
  };

  const vehicleTypes = [
    {
      value: "bike",
      label: "Bike",
      icon: Bike,
      description: "Affordable & quick",
      price: "80-120 BDT",
    },
    {
      value: "car",
      label: "Car",
      icon: Car,
      description: "Comfortable & safe",
      price: "150-200 BDT",
    },
    {
      value: "premium",
      label: "Premium",
      icon: Crown,
      description: "Luxury experience",
      price: "250-350 BDT",
    },
  ];

  const paymentMethods = [
    {
      value: "cash",
      label: "Cash",
      icon: Coins,
      description: "Pay with cash",
    },
    {
      value: "card",
      label: "Card",
      icon: CreditCard,
      description: "Credit/Debit card",
    },
    {
      value: "mobile",
      label: "Mobile Banking",
      icon: Wallet,
      description: "bKash, Nagad, etc.",
    },
  ];

  const watchVehicleType = form.watch("vehicleType");
  const watchPickup = form.watch("pickupAddress");
  const watchDestination = form.watch("destinationAddress");

  // Auto-calculate fare when addresses and vehicle type are filled
  React.useEffect(() => {
    if (watchPickup && watchDestination && watchVehicleType && !estimatedFare) {
      calculateFare({
        pickupAddress: watchPickup,
        destinationAddress: watchDestination,
        vehicleType: watchVehicleType,
        paymentMethod: form.getValues("paymentMethod"),
      });
    }
  }, [watchPickup, watchDestination, watchVehicleType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Book Your Ride
          </h1>
          <p className="text-xl text-muted-foreground">
            Safe, reliable, and affordable rides across the city
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="border border-border shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl flex items-center gap-2 text-card-foreground">
                  <Navigation className="h-6 w-6 text-primary" />
                  Where to?
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Enter your pickup and destination locations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Pickup Location */}
                    <FormField
                      control={form.control}
                      name="pickupAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-chart-2" />
                            Pickup Location
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Enter pickup address..."
                                className="pl-10 border-2 border-input focus:border-primary transition-colors bg-background"
                                {...field}
                              />
                              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Destination Location */}
                    <FormField
                      control={form.control}
                      name="destinationAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-chart-1" />
                            Destination
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Where do you want to go?"
                                className="pl-10 border-2 border-input focus:border-primary transition-colors bg-background"
                                {...field}
                              />
                              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Vehicle Type Selection */}
                    <FormField
                      control={form.control}
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">
                            Vehicle Type
                          </FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-3 gap-4">
                              {vehicleTypes.map((vehicle) => (
                                <div
                                  key={vehicle.value}
                                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                                    field.value === vehicle.value
                                      ? "border-primary bg-primary/10"
                                      : "border-border hover:border-primary/50 bg-card"
                                  }`}
                                  onClick={() => field.onChange(vehicle.value)}
                                >
                                  <div className="flex items-center gap-3 mb-2">
                                    <vehicle.icon
                                      className={`h-6 w-6 ${
                                        field.value === vehicle.value
                                          ? "text-primary"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                    <span className="font-semibold text-card-foreground">
                                      {vehicle.label}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-1">
                                    {vehicle.description}
                                  </p>
                                  <p className="text-sm font-medium text-primary">
                                    {vehicle.price}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Payment Method */}
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">
                            Payment Method
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-2 border-input focus:border-primary bg-background">
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {paymentMethods.map((method) => (
                                <SelectItem
                                  key={method.value}
                                  value={method.value}
                                >
                                  <div className="flex items-center gap-3">
                                    <method.icon className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                      <div className="font-medium text-foreground">
                                        {method.label}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        {method.description}
                                      </div>
                                    </div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting || !estimatedFare}
                      className="w-full bg-primary hover:bg-primary/90 py-6 text-lg font-semibold text-primary-foreground"
                    >
                      {form.formState.isSubmitting ? (
                        <>
                          <Clock className="mr-2 h-5 w-5 animate-spin" />
                          Booking Your Ride...
                        </>
                      ) : (
                        <>
                          <Car className="mr-2 h-5 w-5" />
                          Confirm & Book Ride
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Ride Summary */}
          <div className="space-y-6">
            {/* Fare Estimate */}
            <Card className="border border-border shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <DollarSign className="h-5 w-5 text-chart-2" />
                  Fare Estimate
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isCalculating ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                      Calculating your fare...
                    </p>
                  </div>
                ) : estimatedFare ? (
                  <>
                    <div className="text-center py-4">
                      <div className="text-3xl font-bold text-card-foreground mb-2">
                        ৳{estimatedFare}
                      </div>
                      <p className="text-muted-foreground">Estimated fare</p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base fare</span>
                        <span className="text-card-foreground">
                          ৳
                          {
                            vehicleTypes
                              .find((v) => v.value === watchVehicleType)
                              ?.price.split("-")[0]
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Distance</span>
                        <span className="text-card-foreground">
                          ৳{Math.floor(estimatedFare * 0.6)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time</span>
                        <span className="text-card-foreground">
                          ৳{Math.floor(estimatedFare * 0.4)}
                        </span>
                      </div>
                      <div className="border-t border-border pt-2 flex justify-between font-semibold text-card-foreground">
                        <span>Total</span>
                        <span>৳{estimatedFare}</span>
                      </div>
                    </div>

                    {estimatedTime && (
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
                        <Clock className="h-4 w-4" />
                        <span>Est. {estimatedTime} minutes</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Navigation className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Enter locations to see fare estimate</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Safety Features */}
            <Card className="border border-border shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Users className="h-5 w-5 text-chart-3" />
                  Safety First
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-chart-3/20 rounded-full flex items-center justify-center">
                    <span className="text-chart-3 text-xs">✓</span>
                  </div>
                  <span className="text-card-foreground">Verified drivers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-chart-3/20 rounded-full flex items-center justify-center">
                    <span className="text-chart-3 text-xs">✓</span>
                  </div>
                  <span className="text-card-foreground">
                    Real-time tracking
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-chart-3/20 rounded-full flex items-center justify-center">
                    <span className="text-chart-3 text-xs">✓</span>
                  </div>
                  <span className="text-card-foreground">24/7 support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-chart-3/20 rounded-full flex items-center justify-center">
                    <span className="text-chart-3 text-xs">✓</span>
                  </div>
                  <span className="text-card-foreground">
                    Emergency contact
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
