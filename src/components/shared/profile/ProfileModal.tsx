import { useState } from "react";
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

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "rider" | "driver";
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

export function ProfileModal({
  isOpen,
  onClose,
  user,
  onUpdate,
}: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    onUpdate?.(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
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
      <DialogContent className="max-h-[80vh] py-2 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <User className="h-6 w-6 text-primary" />
            Profile Information
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6">
          {/* Left Column - Basic Info & Stats */}
          <div className="lg:col-span-2 space-y-6">
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
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        onClick={() =>
                          isEditing ? handleSave() : setIsEditing(true)
                        }
                        className="flex items-center gap-2"
                      >
                        {isEditing ? (
                          <>
                            <Save className="h-4 w-4" />
                            Save Changes
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

            {/* Personal Information */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editedUser.name}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, name: e.target.value })
                        }
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{user.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editedUser.phone}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            phone: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Member Since</Label>
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
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Vehicle Model
                      </Label>
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span>{user.vehicleInfo.model}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        License Plate
                      </Label>
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span>{user.vehicleInfo.licensePlate}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Vehicle Type
                      </Label>
                      <Badge variant="outline" className="capitalize">
                        {user.vehicleInfo.carType}
                      </Badge>
                    </div>

                    {user.currentLocation && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Current Location
                        </Label>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{user.currentLocation.address}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-6">
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
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  {user.role === "driver" && (
                    <Button variant="outline" className="w-full justify-start">
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

        {/* Edit Mode Actions */}
        {isEditing && (
          <div className="flex justify-end gap-3 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
