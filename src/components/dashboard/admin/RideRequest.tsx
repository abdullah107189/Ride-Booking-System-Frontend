/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// components/ride/SimpleRideRequestForm.tsx
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { MapPin, Navigation, Car, Clock } from "lucide-react";
import { useRideRequestMutation } from "@/redux/features/ride/ride.api";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";

// Validation Schema - Only pickup and destination
const rideRequestSchema = z.object({
  rider: z.string(),
  pickupAddress: z
    .string()
    .min(5, "Pickup address must be at least 5 characters"),
  destinationAddress: z
    .string()
    .min(5, "Destination address must be at least 5 characters"),
});

type RideFormData = z.infer<typeof rideRequestSchema>;

export function SimpleRideRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RideFormData>({
    resolver: zodResolver(rideRequestSchema),
    defaultValues: {
      rider: "",
      pickupAddress: "",
      destinationAddress: "",
    },
  });

  const [rideRequest, { isLoading: rideRequestLoading }] =
    useRideRequestMutation();
  const { data: riderInfo, isLoading: riderInfoLoading } =
    useGetMeQuery(undefined);
  if (riderInfoLoading) {
    return <div>Loading...</div>;
  }
  const onSubmit = async (data: RideFormData) => {
    try {
      setIsSubmitting(true);

      const pickupCoords: [number, number] = [90.412518, 23.810331];
      const destinationCoords: [number, number] = [90.408, 23.79];

      const rideRequestData = {
        rider: riderInfo?._id,
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
      };
      const res = await rideRequest(rideRequestData).unwrap();
      console.log("Ride request:", res);

      toast.success("Ride Finding! 🚗", {
        description: "Driver will arrive shortly",
      });

      form.reset();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Failed to book ride", {
        description: "Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-5">
      <div className="">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Book Your Ride
          </h1>
          <p className="text-xl text-muted-foreground">
            Enter your pickup and destination to get started
          </p>
        </div>

        <Card className="border border-border shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl flex items-center gap-2 text-card-foreground">
              <Navigation className="h-6 w-6 text-primary" />
              Where to?
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              We'll find you the best ride options
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
                            placeholder="Enter your current location..."
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={rideRequestLoading}
                  className="w-full bg-primary hover:bg-primary/90 py-6 text-lg font-semibold text-primary-foreground"
                >
                  {rideRequestLoading ? (
                    <>
                      <Clock className="mr-2 h-5 w-5 animate-spin" />
                      Finding Rides...
                    </>
                  ) : (
                    <>
                      <Car className="mr-2 h-5 w-5" />
                      Find Rides
                    </>
                  )}
                </Button>
              </form>
            </Form>

            {/* Quick Suggestions */}
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-sm font-medium text-card-foreground mb-3">
                Popular destinations
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Airport", emoji: "✈️" },
                  { label: "Shopping Mall", emoji: "🛍️" },
                  { label: "Restaurant", emoji: "🍽️" },
                  { label: "Office", emoji: "🏢" },
                ].map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start text-sm h-auto py-2"
                    onClick={() => {
                      form.setValue("destinationAddress", item.label);
                    }}
                  >
                    <span className="mr-2">{item.emoji}</span>
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card className="border border-border">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-chart-3/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-chart-3 text-sm">🚗</span>
              </div>
              <p className="text-sm text-card-foreground">
                Multiple vehicle options
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-chart-3/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-chart-3 text-sm">💰</span>
              </div>
              <p className="text-sm text-card-foreground">
                Best price guaranteed
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-chart-3/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-chart-3 text-sm">🛡️</span>
              </div>
              <p className="text-sm text-card-foreground">
                Safe & verified drivers
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
