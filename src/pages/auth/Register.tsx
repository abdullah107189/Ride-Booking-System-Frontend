// RegistrationForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { toast } from "sonner";
import {
  Calendar,
  Mail,
  Phone,
  User,
  Lock,
  GalleryVerticalEnd,
  Car,
  Bike,
  MapPin,
  Badge,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { formSchema } from "./reg.schema";
import type z from "zod/v3";
export function RegistrationForm() {
  type FormValues = z.infer<typeof formSchema>;
  const [userType, setUserType] = useState<"rider" | "driver">("rider");

  const [register, { isLoading }] = useRegisterMutation();

  // 🔥 Separate default values for each role
  const riderDefaultValues = {
    role: "rider" as const,
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const driverDefaultValues = {
    role: "driver" as const,
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    licensePlate: "",
    model: "",
    carType: "",
    address: "",
  };
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: riderDefaultValues, // 🔥 Initially rider values
  });

  // Watch role changes
  const selectedRole = form.watch("role");
  useEffect(() => {
    if (selectedRole === "rider") {
      form.reset(riderDefaultValues);
    } else {
      form.reset(driverDefaultValues);
    }
  }, [selectedRole, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Registration data:", data);

      // Prepare API data based on role
      const apiData = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: data.role,
        ...(data.role === "driver" && {
          vehicleInfo: {
            licensePlate: data.licensePlate,
            model: data.model,
            carType: data.carType,
          },
          currentLocation: {
            location: {
              type: "Point",
              coordinates: [90.412518, 23.810331], // Default Dhaka coordinates
            },
            address: data.address,
          },
        }),
      };
      console.log(apiData);
      // Call RTK Query mutation
      //   const result = await register(apiData).unwrap();

      toast.success("Registration successful! 🎉", {
        description: `Welcome aboard, ${data.name}!`,
      });

      form.reset();
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed", {
        description: "Please try again with different information.",
      });
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            RideShare
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            {/* Role Selection Toggle */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-center mb-6">
                Create Your Account
              </h1>

              <div className="grid grid-cols-2 gap-4 p-1 bg-muted rounded-lg">
                <Button
                  type="button"
                  variant={selectedRole === "rider" ? "default" : "ghost"}
                  className={`flex items-center gap-2 ${
                    selectedRole === "rider"
                      ? "bg-primary shadow-sm"
                      : "hover:bg-transparent"
                  }`}
                  onClick={() => {
                    form.setValue("role", "rider");
                    setUserType("rider");
                  }}
                >
                  <Bike className="h-4 w-4" />
                  Rider
                </Button>

                <Button
                  type="button"
                  variant={selectedRole === "driver" ? "default" : "ghost"}
                  className={`flex items-center gap-2 ${
                    selectedRole === "driver"
                      ? "bg-primary shadow-sm"
                      : "hover:bg-transparent"
                  }`}
                  onClick={() => {
                    form.setValue("role", "driver");
                    setUserType("driver");
                  }}
                >
                  <Car className="h-4 w-4" />
                  Driver
                </Button>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Common Fields */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="John Doe"
                            className="pl-10 bg-background border-input transition-all focus:border-primary"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            className="pl-10 bg-background border-input transition-all focus:border-primary"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="+8801XXXXXXXXX"
                            className="pl-10 bg-background border-input transition-all focus:border-primary"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Driver Specific Fields - Only show when driver is selected */}
                {selectedRole === "driver" && (
                  <div className="space-y-4 p-4 border border-primary/20 rounded-lg bg-primary/5">
                    <h3 className="font-semibold text-primary flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      Vehicle Information
                    </h3>

                    <FormField
                      control={form.control}
                      name="licensePlate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            License Plate
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Badge className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="DHA-12345"
                                className="pl-10 bg-background border-input transition-all focus:border-primary"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">
                              Car Model
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Toyota Corolla"
                                className="bg-background border-input transition-all focus:border-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="carType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">
                              Car Type
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Sedan, SUV, etc."
                                className="bg-background border-input transition-all focus:border-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Current Address
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Banani, Dhaka"
                                className="pl-10 bg-background border-input transition-all focus:border-primary"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Password Fields */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 bg-background border-input transition-all focus:border-primary"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 bg-background border-input transition-all focus:border-primary"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-[hsl(240,83%,65%)] hover:opacity-90 transition-all shadow-lg hover:shadow-xl font-semibold text-primary-foreground"
                >
                  {isLoading ? (
                    "Creating Account..."
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Create {selectedRole === "driver" ? "Driver" : "Rider"}
                      Account
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?
                  <a
                    href="#"
                    className="text-primary hover:underline font-medium transition-colors"
                  >
                    Sign in here
                  </a>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
