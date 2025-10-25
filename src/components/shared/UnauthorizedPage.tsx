// components/UnauthorizedPage.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Home, ArrowLeft, Lock, AlertTriangle } from "lucide-react";
import { Link } from "react-router";

export function UnauthorizedPage() {
  return (
    <div className=" flex items-center justify-center p-4 sm:p-6  overflow-hidden">
      <div className="max-w-md w-full mx-auto">
        <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8 text-center">
            {/* Animated Icon */}
            <div className="relative mb-4 sm:mb-6 ">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Lock className="h-8 w-8 sm:h-10 sm:w-10 text-destructive" />
              </div>
              <div className="absolute inset-0 animate-ping ">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-destructive/20  rounded-full mx-auto"></div>
              </div>
            </div>

            {/* Title & Message */}
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              Access Denied
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-2">
              You don't have permission to access this page.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
              This area requires special authorization. Please contact your
              administrator if you believe this is an error.
            </p>

            {/* Error Code */}
            <div className="bg-muted/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">
                <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
                Error Code: 403
              </div>
              <div className="text-xs text-muted-foreground">
                FORBIDDEN - INSUFFICIENT PERMISSIONS
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 sm:space-y-3">
              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-sm sm:text-base"
              >
                <Link to="/" className="flex items-center justify-center gap-2">
                  <Home className="h-3 w-3 sm:h-4 sm:w-4" />
                  Go to Homepage
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full border-border hover:bg-muted text-sm sm:text-base"
              >
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                  Back to Login
                </Link>
              </Button>
            </div>

            {/* Support Info */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                Need Help?
              </div>
              <p className="text-xs text-muted-foreground">
                Contact support at{" "}
                <a
                  href="mailto:support@rideshare.com"
                  className="text-primary hover:underline break-all"
                >
                  support@rideshare.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-xs text-muted-foreground px-2">
            🔒 Your security is important to us. Unauthorized access attempts
            are logged.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
