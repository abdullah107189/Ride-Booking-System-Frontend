/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";
import {
  DollarSign,
  TrendingUp,
  Users,
  Car,
  Calendar,
  type LucideIcon,
} from "lucide-react";
import { useGetEarningsStatsQuery } from "@/redux/features/admin/admin.api";
import { PageHeader } from "@/components/shared/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

interface CustomPieLabelRenderProps extends PieLabelRenderProps {
  percent: number;
}

type TimeRange = "daily" | "weekly" | "monthly";

interface DriverData {
  driverName: string;
  earnings: number;
  rides: number;
}

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: "positive" | "negative";
}

interface DriverRowProps {
  rank: number;
  name: string;
  earnings: number;
  rides: number;
}

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
}
// ----------------------------------------------------

const timeRanges: { value: TimeRange; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function EarningsDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly");
  const { data: statsData, isLoading } = useGetEarningsStatsQuery(timeRange);

  const stats = statsData?.data || {
    totalEarnings: 0,
    totalRides: 0,
    earningsByDate: [],
    earningsByVehicle: [],
    topDrivers: [],
  };

  // Format data for charts
  const earningsChartData = stats.earningsByDate.map((item: any) => ({
    name: item._id,
    earnings: item.earnings,
    rides: item.rides,
  }));

  const vehicleChartData = stats.earningsByVehicle.map((item: any) => ({
    name: item._id || "Unknown",
    value: item.earnings,
    rides: item.rides,
  }));

  const topDriversData: DriverData[] = stats.topDrivers.map((driver: any) => ({
    driverName: driver.driverName,
    earnings: driver.earnings,
    rides: driver.rides,
  }));

  if (isLoading) {
    return <EarningsDashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Earnings Dashboard" />

      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <Tabs
          value={timeRange}
          // 💡 পরিবর্তন: (value) => setTimeRange(value as TimeRange) - as any এর বদলে নির্দিষ্ট টাইপ
          onValueChange={(value) => setTimeRange(value as TimeRange)}
        >
          <TabsList>
            {timeRanges.map((range) => (
              <TabsTrigger key={range.value} value={range.value}>
                {range.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* StatCard এখন StatCardProps ইন্টারফেস ব্যবহার করবে */}
        <StatCard
          title="Total Earnings"
          value={`৳${stats.totalEarnings.toLocaleString()}`}
          description={`${timeRange} revenue`}
          icon={DollarSign}
          trend="+12.5%"
          trendType="positive"
        />
        <StatCard
          title="Total Rides"
          value={stats.totalRides.toLocaleString()}
          description="Completed rides"
          icon={Car}
          trend="+8.2%"
          trendType="positive"
        />
        <StatCard
          title="Average per Ride"
          value={`৳${
            stats.totalRides > 0
              ? Math.round(stats.totalEarnings / stats.totalRides)
              : 0
          }`}
          description="Average fare"
          icon={TrendingUp}
          trend="+3.1%"
          trendType="positive"
        />
        <StatCard
          title="Active Drivers"
          value={stats.topDrivers.length.toString()}
          description="Top performers"
          icon={Users}
          trend="+5.7%"
          trendType="positive"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Over Time BarChart */}
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Earnings Over Time
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={earningsChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [
                      `৳${value.toLocaleString()}`,
                      "Earnings",
                    ]}
                  />
                  <Bar
                    dataKey="earnings"
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Earnings by Vehicle Type PieChart */}
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Earnings by Vehicle Type
            </CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vehicleChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={
                      ((props: CustomPieLabelRenderProps) =>
                        `${props.name} (${(props.percent * 100).toFixed(
                          0
                        )}%)`) as any
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {vehicleChartData.map((index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [
                      `৳${value.toLocaleString()}`,
                      "Earnings",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Drivers */}
        <Card className="border border-border lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Drivers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDriversData.map((driver, index: number) => (
                // DriverRow এখন DriverRowProps ইন্টারফেস ব্যবহার করবে
                <DriverRow
                  key={driver.driverName}
                  rank={index + 1}
                  name={driver.driverName}
                  earnings={driver.earnings}
                  rides={driver.rides}
                />
              ))}
              {topDriversData.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No driver data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* MetricCard এখন MetricCardProps ইন্টারফেস ব্যবহার করবে */}
        <MetricCard
          title="Peak Hours"
          value="5 PM - 8 PM"
          description="Highest earning period"
        />
        <MetricCard
          title="Most Popular Vehicle"
          value={vehicleChartData[0]?.name || "N/A"}
          description="Highest earning category"
        />
        <MetricCard
          title="Platform Commission"
          value="15%"
          description="Average commission rate"
        />
      </div>
    </div>
  );
}

// Helper Components
// 💡 StatCard এর টাইপ এখন StatCardProps
const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendType,
}: StatCardProps) => (
  <Card className="border border-border">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
      {trend && (
        <Badge
          variant={trendType === "positive" ? "default" : "destructive"}
          className="mt-2"
        >
          {trend}
        </Badge>
      )}
    </CardContent>
  </Card>
);

// 💡 DriverRow এর টাইপ এখন DriverRowProps
const DriverRow = ({ rank, name, earnings, rides }: DriverRowProps) => (
  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
    <div className="flex items-center gap-4">
      <Badge
        variant="outline"
        className="w-8 h-8 flex items-center justify-center"
      >
        {rank}
      </Badge>
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-muted-foreground">{rides} rides</div>
      </div>
    </div>
    <div className="text-right">
      <div className="font-bold text-green-600">
        ৳{earnings.toLocaleString()}
      </div>
      <div className="text-sm text-muted-foreground">Earnings</div>
    </div>
  </div>
);

// 💡 MetricCard এর টাইপ এখন MetricCardProps
const MetricCard = ({ title, value, description }: MetricCardProps) => (
  <Card className="border border-border">
    <CardContent className="p-6">
      <div className="text-sm font-medium text-muted-foreground mb-1">
        {title}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </CardContent>
  </Card>
);

// ... (EarningsDashboardSkeleton ফাংশনটি আগের মতোই থাকবে) ...

const EarningsDashboardSkeleton = () => (
  <div className="space-y-6">
    <PageHeader title="Earnings Dashboard" description="Loading..." />

    {/* Time Range Skeleton */}
    <div className="flex gap-2">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-10 w-20" />
      ))}
    </div>

    {/* Stats Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="border border-border">
          <CardHeader className="space-y-0 pb-2">
            <Skeleton className="h-4 w-20" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Charts Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[1, 2].map((i) => (
        <Card key={i} className="border border-border">
          <CardHeader>
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default EarningsDashboard;
