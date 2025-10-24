/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Car, ArrowLeft, Save, MailIcon } from "lucide-react";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

// Validation Schema
const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  role: z.string().optional(),
  vehicleInfo: z
    .object({
      licensePlate: z.string().min(1, "License plate is required"),
      model: z.string().min(1, "Vehicle model is required"),
      carType: z.string().min(1, "Vehicle type is required"),
    })
    .optional(),
  currentLocation: z
    .object({
      address: z.string().min(1, "Location address is required"),
    })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileEdit() {
  const navigate = useNavigate();
  const { data: userData, isLoading } = useGetMeQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      vehicleInfo: {
        licensePlate: "",
        model: "",
        carType: "",
      },
      currentLocation: {
        address: "",
      },
    },
  });

  useEffect(() => {
    if (userData) {
      const user = userData;
      form.reset({
        name: user.name,
        phone: user.phone,
        vehicleInfo: user.vehicleInfo || {
          licensePlate: "",
          model: "",
          carType: "",
        },
        currentLocation: user.currentLocation || {
          address: "",
        },
      });
    }
  }, [userData, form]);

  console.log(userData);
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const updateData: any = {
        name: data.name,
        phone: data.phone,
      };

      if (userData?.role === "driver") {
        updateData.vehicleInfo = data.vehicleInfo;
        updateData.currentLocation = data.currentLocation;
      }
      console.log(updateData);

      const result = await updateProfile(updateData).unwrap();
      console.log(result);

      toast.success("Profile updated successfully!");
      navigate(-1);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const user = userData;

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isUpdating}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="">
                    <FormLabel>Email</FormLabel>
                    <div className="mt-2 flex items-center gap-2 p-3 bg-muted rounded-md">
                      <MailIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm capitalize">{user?.email}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Role cannot be changed
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Role</FormLabel>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm capitalize">{user?.role}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Role cannot be changed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Driver Specific Information */}
            {user?.role === "driver" && (
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Car className="h-5 w-5 text-primary" />
                    Vehicle Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="vehicleInfo.model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Model</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vehicleInfo.licensePlate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Plate</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vehicleInfo.carType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select vehicle type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="car">Car</SelectItem>
                              <SelectItem value="bike">Bike</SelectItem>
                              <SelectItem value="cng">Cng</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currentLocation.address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Location</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your current location"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Saving Changes..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
