/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  User,
  Mail,
  Phone,
  Car,
  MapPin,
  Shield,
  Star,
  DollarSign,
  Calendar,
  Edit3,
  Save,
  X,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "@/redux/features/auth/auth.api";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isBlocked: boolean;
  isOnline: boolean;
  isApproved?: boolean;
  vehicleInfo?: {
    licensePlate: string;
    model: string;
    carType: string;
  };
  currentLocation?: {
    address: string;
  };
  totalEarnings?: number;
  rating?: number;
  totalRides?: number;
  createdAt: string;
  updatedAt: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdate?: (updatedData: Partial<UserProfile>) => void;
}

interface ProfileFormValues {
  name: string;
  phone: string;
  vehicleInfo?: {
    licensePlate: string;
    model: string;
    carType: string;
  };
  currentLocation?: {
    address: string;
  };
}

export function ProfileModal({
  isOpen,
  onClose,
  user,
  onUpdate,
}: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);

  const profileFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
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

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
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
    },
  });

  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateProfileMutation();
  console.log("update loginLoading:", updateLoading);

  useEffect(() => {
    if (user) {
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
  }, [user, form]);

  const handleSave = async (data: ProfileFormValues) => {
    try {
      console.log("Saving profile data:", data);

      const updateData: any = {
        name: data.name,
        phone: data.phone,
      };

      if (user.role === "driver") {
        updateData.vehicleInfo = data.vehicleInfo;
        updateData.currentLocation = data.currentLocation;
      }

      console.log("Sending to API:", updateData);

      const result = await updateProfile(updateData).unwrap();

      console.log("Update successful:", result);
      toast.success("Profile updated successfully!");

      setIsEditing(false);

      if (onUpdate) {
        onUpdate(updateData);
      }
    } catch (error: any) {
      console.error("Update failed:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
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
    setIsEditing(false);
  };

  const getRoleBadge = (role: string) => {
    const config = {
      rider: {
        color: "text-blue-600",
        bgColor: "bg-blue-500/10",
        label: "Rider",
      },
      driver: {
        color: "text-green-600",
        bgColor: "bg-green-500/10",
        label: "Driver",
      },
    };
    return config[role as keyof typeof config] || config.rider;
  };

  const roleConfig = getRoleBadge(user.role);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <User className="h-6 w-6 text-primary" />
            Profile Information
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
            {/* Profile Header */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">
                          {user.name}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            className={`${roleConfig.bgColor} ${roleConfig.color}`}
                          >
                            {roleConfig.label}
                          </Badge>
                          <Badge
                            variant={user.isOnline ? "default" : "secondary"}
                            className={
                              user.isOnline
                                ? "bg-green-500/10 text-green-600"
                                : "bg-gray-500/10 text-gray-600"
                            }
                          >
                            {user.isOnline ? "Online" : "Offline"}
                          </Badge>
                          {user.role === "driver" && user.isApproved && (
                            <Badge className="bg-green-500/10 text-green-600 flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Approved
                            </Badge>
                          )}
                        </div>
                      </div>
                      {/* FIXED: Button type always "button" for edit mode */}
                      <Button
                        type="button"
                        variant={isEditing ? "default" : "outline"}
                        onClick={() => {
                          if (!isEditing) {
                            setIsEditing(true);
                          }
                        }}
                        disabled={updateLoading}
                        className="flex items-center gap-2"
                      >
                        {isEditing ? (
                          <>
                            <Edit3 className="h-4 w-4" />
                            Editing...
                          </>
                        ) : (
                          <>
                            <Edit3 className="h-4 w-4" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FIXED: Proper grid structure */}
            <div className="">
              {/* Left Column - Basic Info & Vehicle Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information */}
                <Card className="border border-border">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name Field */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-medium">
                              Full Name
                            </FormLabel>
                            {isEditing ? (
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            ) : (
                              <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>{field.value}</span>
                              </div>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Email Field (Read-only) */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                      </div>

                      {/* Phone Field */}
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-medium">
                              Phone Number
                            </FormLabel>
                            {isEditing ? (
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            ) : (
                              <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{field.value}</span>
                              </div>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Member Since (Read-only) */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Member Since
                        </Label>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Driver Specific Information */}
                {user.role === "driver" && user.vehicleInfo && (
                  <Card className="border border-border">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Car className="h-5 w-5 text-primary" />
                        Vehicle Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Vehicle Model */}
                        <FormField
                          control={form.control}
                          name="vehicleInfo.model"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-medium">
                                Vehicle Model
                              </FormLabel>
                              {isEditing ? (
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              ) : (
                                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                                  <Car className="h-4 w-4 text-muted-foreground" />
                                  <span>{field.value}</span>
                                </div>
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* License Plate */}
                        <FormField
                          control={form.control}
                          name="vehicleInfo.licensePlate"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-medium">
                                License Plate
                              </FormLabel>
                              {isEditing ? (
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              ) : (
                                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                                  <Shield className="h-4 w-4 text-muted-foreground" />
                                  <span>{field.value}</span>
                                </div>
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Vehicle Type */}
                        <FormField
                          control={form.control}
                          name="vehicleInfo.carType"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-medium">
                                Vehicle Type
                              </FormLabel>
                              {isEditing ? (
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
                                    <SelectItem value="premium">
                                      Premium
                                    </SelectItem>
                                    <SelectItem value="suv">SUV</SelectItem>
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Badge variant="outline" className="capitalize">
                                  {field.value}
                                </Badge>
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Current Location */}
                        <FormField
                          control={form.control}
                          name="currentLocation.address"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-medium">
                                Current Location
                              </FormLabel>
                              {isEditing ? (
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              ) : (
                                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span>{field.value || "Not set"}</span>
                                </div>
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Stats & Actions */}
              <div className="space-y-6 mt-4  ">
                {/* Statistics */}
                <Card className="border border-border">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Statistics
                    </h3>
                    <div className="space-y-4">
                      {user.role === "driver" && (
                        <>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="text-sm">Total Earnings</span>
                            </div>
                            <span className="font-bold text-green-600">
                              ৳{user.totalEarnings || 0}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Car className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">Total Rides</span>
                            </div>
                            <span className="font-bold text-blue-600">
                              {user.totalRides || 0}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-600 fill-yellow-400" />
                              <span className="text-sm">Rating</span>
                            </div>
                            <span className="font-bold text-yellow-600">
                              {user.rating || "N/A"}
                            </span>
                          </div>
                        </>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">Last Updated</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(user.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border border-border">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Support
                      </Button>
                      {user.role === "driver" && (
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Car className="h-4 w-4 mr-2" />
                          Update Vehicle Info
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Status Info */}
                <Card className="border border-border">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Account Status
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Verification</span>
                        <Badge
                          variant="default"
                          className="bg-green-500/10 text-green-600"
                        >
                          Verified
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Account Status</span>
                        <Badge
                          variant={user.isBlocked ? "destructive" : "default"}
                          className={
                            user.isBlocked
                              ? "bg-red-500/10 text-red-600"
                              : "bg-green-500/10 text-green-600"
                          }
                        >
                          {user.isBlocked ? "Blocked" : "Active"}
                        </Badge>
                      </div>
                      {user.role === "driver" && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Driver Status</span>
                          <Badge
                            variant={user.isApproved ? "default" : "secondary"}
                            className={
                              user.isApproved
                                ? "bg-green-500/10 text-green-600"
                                : "bg-yellow-500/10 text-yellow-600"
                            }
                          >
                            {user.isApproved ? "Approved" : "Pending"}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Edit Mode Actions - ONLY show when editing */}
            {isEditing && (
              <div className="flex justify-end gap-3 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={updateLoading}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updateLoading}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {updateLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
