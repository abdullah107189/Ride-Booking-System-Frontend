/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, TrendingUp, Car, Calendar, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { useGetDriverEarningsStatsQuery } from "@/redux/features/driver/driver.api";

const timeRanges = [
  { value: "daily", label: "Today" },
  { value: "weekly", label: "This Week" },
  { value: "monthly", label: "This Month" },
];

export function DriverEarnings() {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">(
    "monthly"
  );
  const { data: statsData, isLoading } =
    useGetDriverEarningsStatsQuery(timeRange);

  const stats = statsData?.data || {
    totalEarnings: 0,
    totalRides: 0,
    averageEarnings: 0,
    earningsByDate: [],
  };

  // Format chart data
  const chartData = stats.earningsByDate.map((item: any) => ({
    name: item._id,
    earnings: item.earnings,
    rides: item.rides,
  }));

  if (isLoading) {
    <div>Driver earning data loading...</div>;
  }
  return (
    <div className="space-y-6">
      <PageHeader title="My Earnings" />

      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <Tabs
          value={timeRange}
          onValueChange={(value) => setTimeRange(value as any)}
        >
          <TabsList>
            {timeRanges.map((range) => (
              <TabsTrigger key={range.value} value={range.value}>
                {range.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Earnings"
          value={`৳${stats.totalEarnings.toLocaleString()}`}
          description={`${
            timeRanges.find((t) => t.value === timeRange)?.label
          } earnings`}
          icon={DollarSign}
        />
        <StatCard
          title="Completed Rides"
          value={stats.totalRides.toString()}
          description="Total rides"
          icon={Car}
        />
        <StatCard
          title="Average per Ride"
          value={`৳${Math.round(stats.averageEarnings || 0)}`}
          description="Average fare"
          icon={TrendingUp}
        />
      </div>

      {/* Earnings Chart */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Earnings Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [`৳${value}`, "Earnings"]}
                  />
                  <Bar
                    dataKey="earnings"
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                    name="Earnings"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No earnings data for selected period
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chartData
              .slice(-5)
              .reverse()
              .map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.rides} rides
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">
                      ৳{item.earnings}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Earnings
                    </div>
                  </div>
                </div>
              ))}
            {chartData.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No recent activity
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper Components
const StatCard = ({ title, value, description, icon: Icon }: any) => (
  <Card className="border border-border">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default DriverEarnings;
