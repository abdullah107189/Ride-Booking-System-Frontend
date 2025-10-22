// components/rider/RiderDashboard.tsx
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Car,
  MapPin,
  DollarSign,
  User,
  Settings,
  History,
  Navigation,
  Phone,
  Star,
  Calendar,
  ArrowUpDown,
} from "lucide-react";
import { SimpleRideRequestForm } from "@/components/dashboard/admin/RideRequest";

// Mock data
const ongoingRide = {
  id: "1",
  driver: {
    name: "Abdul Karim",
    phone: "+8801XXXXXXXXX",
    rating: 4.8,
    carModel: "Toyota Corolla",
    licensePlate: "DHA-12345",
  },
  pickup: "Banani, Dhaka",
  destination: "Gulshan, Dhaka",
  fare: 180,
  estimatedTime: "8 min",
  status: "on_the_way",
};

const recentRides = [
  {
    id: "1",
    date: "2024-01-15",
    pickup: "Banani",
    destination: "Gulshan",
    fare: 160,
    status: "completed",
    driver: "Mohammad Ali",
    rating: 4.5,
  },
  {
    id: "2",
    date: "2024-01-14",
    pickup: "Uttara",
    destination: "Airport",
    fare: 220,
    status: "completed",
    driver: "Rahim Khan",
    rating: 4.9,
  },
  {
    id: "3",
    date: "2024-01-13",
    pickup: "Dhanmondi",
    destination: "Mirpur",
    fare: 140,
    status: "completed",
    driver: "Sofia Begum",
    rating: 4.7,
  },
];

export function RiderDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Rider Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back! Ready for your next ride?
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button size="sm">
                <Car className="h-4 w-4 mr-2" />
                Book New Ride
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("overview")}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === "book" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("book")}
                >
                  <Car className="h-4 w-4 mr-2" />
                  Book Ride
                </Button>
                <Button
                  variant={activeTab === "history" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("history")}
                >
                  <History className="h-4 w-4 mr-2" />
                  Ride History
                </Button>
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Rides
                  </span>
                  <span className="font-semibold">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Spent
                  </span>
                  <span className="font-semibold">৳8,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Avg. Rating
                  </span>
                  <span className="font-semibold flex items-center">
                    4.7{" "}
                    <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="book">Book Ride</TabsTrigger>
                <TabsTrigger value="history">Ride History</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Ongoing Ride */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Navigation className="h-5 w-5 text-blue-500" />
                      Ongoing Ride
                    </CardTitle>
                    <CardDescription>
                      Your current ride details and tracking
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            From
                          </span>
                          <span className="font-medium">
                            {ongoingRide.pickup}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            To
                          </span>
                          <span className="font-medium">
                            {ongoingRide.destination}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Fare
                          </span>
                          <span className="font-medium">
                            ৳{ongoingRide.fare}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            ETA
                          </span>
                          <span className="font-medium">
                            {ongoingRide.estimatedTime}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            Driver
                          </span>
                          <span className="font-medium">
                            {ongoingRide.driver.name}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            Vehicle
                          </span>
                          <span className="font-medium">
                            {ongoingRide.driver.carModel}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            Rating
                          </span>
                          <span className="flex items-center font-medium">
                            {ongoingRide.driver.rating}
                            <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
                          </span>
                        </div>
                        <Button className="w-full">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Driver
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Book & Recent Rides */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Quick Book */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Book</CardTitle>
                      <CardDescription>
                        Book your frequent destinations quickly
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Home to Office
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Office to Home
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Current to Airport
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Recent Rides */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Rides</CardTitle>
                      <CardDescription>
                        Your last 3 completed rides
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {recentRides.map((ride) => (
                        <div
                          key={ride.id}
                          className="flex justify-between items-center p-3 border rounded-lg"
                        >
                          <div>
                            <div className="font-medium">
                              {ride.pickup} → {ride.destination}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {ride.date} • ৳{ride.fare}
                            </div>
                          </div>
                          <Badge variant="secondary">Completed</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Book Ride Tab */}
              {/* <TabsContent value="book">
                <Card>
                  <CardHeader>
                    <CardTitle>Book a New Ride</CardTitle>
                    <CardDescription>
                      Enter your pickup and destination locations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Pickup Location
                          </label>
                          <Input placeholder="Enter pickup address..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Destination
                          </label>
                          <Input placeholder="Where do you want to go?" />
                        </div>
                      </div>
                      <Button className="w-full">
                        <Car className="h-4 w-4 mr-2" />
                        Confirm & Book Ride
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent> */}
              <TabsContent value="book">
                <SimpleRideRequestForm></SimpleRideRequestForm>
              </TabsContent>
              {/* Ride History Tab */}
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Ride History</CardTitle>
                    <CardDescription>
                      View your past rides and transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Search and Filter */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input
                            placeholder="Search rides..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <Button variant="outline">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline">
                          <Calendar className="h-4 w-4 mr-2" />
                          Date
                        </Button>
                      </div>

                      {/* Ride History List */}
                      <div className="space-y-3">
                        {recentRides.map((ride) => (
                          <Card key={ride.id} className="p-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <MapPin className="h-4 w-4 text-green-500" />
                                  <span className="font-medium">
                                    {ride.pickup}
                                  </span>
                                  <ArrowUpDown className="h-4 w-4 text-gray-400" />
                                  <MapPin className="h-4 w-4 text-red-500" />
                                  <span className="font-medium">
                                    {ride.destination}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {ride.date}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />৳
                                    {ride.fare}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {ride.driver}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    {ride.rating}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">Completed</Badge>
                                <Button variant="outline" size="sm">
                                  Details
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Management</CardTitle>
                    <CardDescription>
                      Update your personal information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Full Name
                          </label>
                          <Input defaultValue="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Phone Number
                          </label>
                          <Input defaultValue="+8801XXXXXXXXX" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <Input defaultValue="john@example.com" type="email" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Emergency Contact
                          </label>
                          <Input defaultValue="+8801XXXXXXXXX" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium">Change Password</h3>
                        <div className="space-y-3">
                          <Input
                            type="password"
                            placeholder="Current Password"
                          />
                          <Input type="password" placeholder="New Password" />
                          <Input
                            type="password"
                            placeholder="Confirm New Password"
                          />
                        </div>
                      </div>

                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
