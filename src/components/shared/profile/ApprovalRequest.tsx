/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Send,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { useRequestApprovalMutation } from "@/redux/features/driver/driver.api";

interface ApprovalRequestProps {
  driverData: any;
  refetch: () => void;
}

export function ApprovalRequest({ driverData, refetch }: ApprovalRequestProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestApproval] = useRequestApprovalMutation();

  const handleRequestApproval = async () => {
    try {
      setIsSubmitting(true);
      await requestApproval(undefined).unwrap();
      toast.success("Approval request sent successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send approval request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusConfig = (status: string) => {
    const configs: any = {
      pending: {
        label: "Pending Approval",
        color: "text-yellow-600",
        bgColor: "bg-yellow-500/10",
        icon: Clock,
        description: "Your application is under review by our admin team.",
      },
      approved: {
        label: "Approved",
        color: "text-green-600",
        bgColor: "bg-green-500/10",
        icon: CheckCircle2,
        description:
          "Your driver account has been approved. You can now accept rides.",
      },
      rejected: {
        label: "Rejected",
        color: "text-red-600",
        bgColor: "bg-red-500/10",
        icon: XCircle,
        description:
          "Your application was not approved. Please contact support for more information.",
      },
      not_requested: {
        label: "Not Requested",
        color: "text-gray-600",
        bgColor: "bg-gray-500/10",
        icon: AlertTriangle,
        description: "You haven't submitted an approval request yet.",
      },
    };
    return configs[status] || configs.not_requested;
  };

  const getCurrentStatus = () => {
    if (driverData?.isApproved) return "approved";
    if (driverData?.approvalStatus === "pending") return "pending";
    if (driverData?.approvalStatus === "rejected") return "rejected";
    return "not_requested";
  };

  const currentStatus = getCurrentStatus();
  const statusConfig = getStatusConfig(currentStatus);
  const StatusIcon = statusConfig.icon;

  const requirements = [
    "Valid driver's license",
    "Vehicle registration documents",
    "Insurance certificate",
    "Vehicle fitness certificate",
    "Clear background check",
  ];

  return (
    <div className="space-y-6">
      {/* Approval Status Card */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Driver Approval Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <Badge
                  className={`${statusConfig.bgColor} ${statusConfig.color} text-sm py-1 px-3`}
                >
                  <StatusIcon className={`h-6 w-6 ${statusConfig.color}`} />
                  {statusConfig.label}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  {statusConfig.description}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {currentStatus === "not_requested" && (
            <div className="pt-4 border-t border-border">
              <Button
                onClick={handleRequestApproval}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Request Approval"}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                By requesting approval, you confirm that you meet all the
                requirements below.
              </p>
            </div>
          )}

          {/* Pending Actions */}
          {currentStatus === "pending" && (
            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-yellow-600">
                <Clock className="h-4 w-4" />
                <span>
                  Your request is being reviewed. This usually takes 24-48
                  hours.
                </span>
              </div>
            </div>
          )}

          {/* Rejected Actions */}
          {currentStatus === "rejected" && (
            <div className="pt-4 border-t border-border">
              <Button
                onClick={handleRequestApproval}
                disabled={isSubmitting}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Resubmitting..." : "Resubmit Request"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Requirements Card */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Driver Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              To become an approved driver, you must meet the following
              requirements:
            </p>

            <ul className="space-y-2">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  {requirement}
                </li>
              ))}
            </ul>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> You will need to provide documentation
                for these requirements when requested by our verification team.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps Card */}
      {(currentStatus === "not_requested" || currentStatus === "rejected") && (
        <Card className="border border-dashed border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-yellow-700">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                <span>Click "Request Approval" to submit your application</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                <span>Our team will review your profile and documents</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                <span>You'll receive a notification once approved</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
