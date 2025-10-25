// components/common/PageHeader.ts
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router";
import type { ReactNode } from "react";
import { ModeToggle } from "../mode-toggle";
import { HeaderProfile } from "./profile/HeaderProfile";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  status?: "online" | "offline" | "busy" | "earning";
  statusText?: string;
  showBackButton?: boolean;
  backUrl?: string;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  description,
  status,
  statusText,
  action,
  children,
  className,
}: PageHeaderProps) {
  const navigate = useNavigate();

  const getStatusConfig = () => {
    switch (status) {
      case "online":
        return {
          color: "text-green-600",
          bgColor: "bg-green-600/10",
          dotColor: "bg-green-500",
        };
      case "offline":
        return {
          color: "text-gray-600",
          bgColor: "bg-gray-600/10",
          dotColor: "bg-gray-500",
        };
      case "busy":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-600/10",
          dotColor: "bg-yellow-500",
        };
      case "earning":
        return {
          color: "text-blue-600",
          bgColor: "bg-blue-600/10",
          dotColor: "bg-blue-500",
        };
      default:
        return {
          color: "text-gray-600",
          bgColor: "bg-gray-600/10",
          dotColor: "bg-gray-500",
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div
      className={cn(
        "flex md:flex-row flex-col items-center  justify-between bg-card border p-2 rounded-2xl",
        className
      )}
    >
      {/* Right Side - Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="h-9 w-9 rounded-full border border-border hover:bg-accent"
        >
          <Home className="h-5 w-5" />
        </Button>
        <ModeToggle></ModeToggle>

        <HeaderProfile></HeaderProfile>
      </div>

      {/* Main Header Content */}
      <div className="">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="">
            {/* Title & Subtitle */}
            <div className="flex items-center gap-3 md:mb-3">
              <h1 className="md:text-4xl font-mono text-xl font-bold text-foreground tracking-tight md:mr-5">
                {title}
              </h1>
              {status && (
                <Badge
                  variant="secondary"
                  className={cn(
                    "flex items-center gap-2 py-1.5 px-3",
                    statusConfig.bgColor,
                    statusConfig.color
                  )}
                >
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full animate-pulse",
                      statusConfig.dotColor
                    )}
                  />
                  {statusText || status}
                </Badge>
              )}
            </div>

            {/* Description */}
            {subtitle && (
              <p className="text-xl text-muted-foreground font-light mb-2">
                {subtitle}
              </p>
            )}
            {description && (
              <p className="text-muted-foreground max-w-2xl">{description}</p>
            )}
          </div>

          {/* Action Button */}
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>

        {/* Additional Children */}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}

// Pre-styled header variants
// eslint-disable-next-line react-refresh/only-export-components
export const Header = {
  // For main dashboard pages
  Dashboard: ({
    title,
    subtitle,
    earnings,
    rideCount,
  }: {
    title: string;
    subtitle?: string;
    earnings?: number;
    rideCount?: number;
  }) => (
    <PageHeader
      title={title}
      subtitle={subtitle}
      status="online"
      statusText="Online & Available"
      children={
        <div className="flex flex-wrap gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">
              {rideCount || 0}
            </div>
            <div className="text-sm text-muted-foreground">Today's Rides</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">
              ৳{earnings || 0}
            </div>
            <div className="text-sm text-muted-foreground">Earnings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">4.8</div>
            <div className="text-sm text-muted-foreground">Rating</div>
          </div>
        </div>
      }
    />
  ),

  // For detail pages with back button
  Detail: ({
    title,
    subtitle,
    description,
    showBackButton = true,
  }: {
    title: string;
    subtitle?: string;
    description?: string;
    showBackButton?: boolean;
  }) => (
    <PageHeader
      title={title}
      subtitle={subtitle}
      description={description}
      showBackButton={showBackButton}
    />
  ),

  // For settings/static pages
  Simple: ({ title, description }: { title: string; description?: string }) => (
    <PageHeader title={title} description={description} showBackButton={true} />
  ),

  // For action pages with CTA button
  Action: ({
    title,
    subtitle,
    action,
  }: {
    title: string;
    subtitle?: string;
    action: ReactNode;
  }) => (
    <PageHeader
      title={title}
      subtitle={subtitle}
      action={action}
      showBackButton={true}
    />
  ),
};
