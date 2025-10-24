/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  CheckCircle2,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";

export function ProfileView() {
  const navigate = useNavigate();
  const { data: userData, isLoading } = useGetMeQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>User not found</p>
      </div>
    );
  }

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
      admin: {
        color: "text-purple-600",
        bgColor: "bg-purple-500/10",
        label: "Admin",
      },
    };
    return config[role as keyof typeof config] || config.rider;
  };

  const roleConfig = getRoleBadge(userData?.role);

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <Button
          onClick={() => navigate(`/${userData?.role}/profile-edit`)}
          className="flex items-center gap-2"
        >
          <Edit3 className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Header */}
          <Card className="border border-border shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {userData?.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      className={`${roleConfig.bgColor} ${roleConfig.color} text-sm py-1 px-3`}
                    >
                      {roleConfig.label}
                    </Badge>
                    <Badge
                      variant={userData?.isOnline ? "default" : "secondary"}
                      className={
                        userData?.isOnline
                          ? "bg-green-500/10 text-green-600"
                          : "bg-gray-500/10 text-gray-600"
                      }
                    >
                      {userData?.isOnline ? "Online" : "Offline"}
                    </Badge>
                    {userData?.role === "driver" && userData?.isApproved && (
                      <Badge className="bg-green-500/10 text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Approved
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
                <div className="space-y-1">
                  <Label>Full Name</Label>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{userData?.name}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>Email Address</Label>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{userData?.email}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>Phone Number</Label>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{userData?.phone}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>Member Since</Label>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {new Date(userData?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Driver Specific Information */}
          {userData?.role === "driver" && userData?.vehicleInfo && (
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Car className="h-5 w-5 text-primary" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label>Vehicle Model</Label>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {userData?.vehicleInfo.model}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label>License Plate</Label>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {userData?.vehicleInfo.licensePlate}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label>Vehicle Type</Label>
                    <div className="p-3">
                      <Badge
                        variant="outline"
                        className="capitalize text-sm py-1 px-3"
                      >
                        {userData?.vehicleInfo.carType}
                      </Badge>
                    </div>
                  </div>

                  {userData?.currentLocation && (
                    <div className="space-y-1">
                      <Label>Current Location</Label>
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {userData?.currentLocation.address}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Stats & Status */}
        <div className="space-y-6">
          {/* Statistics */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {userData?.role === "driver" && (
                  <>
                    <StatItem
                      icon={DollarSign}
                      label="Total Earnings"
                      value={`৳${userData?.totalEarnings || 0}`}
                      color="text-green-600"
                    />
                    <StatItem
                      icon={Car}
                      label="Total Rides"
                      value={userData?.totalRides || 0}
                      color="text-blue-600"
                    />
                    <StatItem
                      icon={Star}
                      label="Rating"
                      value={userData?.rating || "N/A"}
                      color="text-yellow-600"
                    />
                  </>
                )}
                <StatItem
                  icon={Clock}
                  label="Last Updated"
                  value={new Date(userData?.updatedAt).toLocaleDateString()}
                  color="text-purple-600"
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <StatusItem
                  label="Verification"
                  value="Verified"
                  status="success"
                />
                <StatusItem
                  label="Account Status"
                  value={userData?.isBlocked ? "Blocked" : "Active"}
                  status={userData?.isBlocked ? "error" : "success"}
                />
                {userData?.role === "driver" && (
                  <StatusItem
                    label="Driver Status"
                    value={userData?.isApproved ? "Approved" : "Pending"}
                    status={userData?.isApproved ? "success" : "warning"}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper Components
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-medium text-muted-foreground mb-2">{children}</p>
);

const StatItem = ({ icon: Icon, label, value, color }: any) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Icon className={`h-4 w-4 ${color}`} />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <span className={`font-bold ${color}`}>{value}</span>
  </div>
);

const StatusItem = ({ label, value, status }: any) => {
  const statusConfig = {
    success: "bg-green-500/10 text-green-600",
    warning: "bg-yellow-500/10 text-yellow-600",
    error: "bg-red-500/10 text-red-600",
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <Badge className={statusConfig[status as keyof typeof statusConfig]}>
        {value}
      </Badge>
    </div>
  );
};
