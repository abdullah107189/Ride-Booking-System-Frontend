import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useState } from "react";
import { toast } from "sonner";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      toast.success("Logged out successfully!", {
        description: "You have been logged out.",
      });
      navigate("/");
      setShowLogoutDialog(false);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed", {
        description: "Please try again.",
      });
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };
  return (
    <div>
      <Button onClick={handleLogoutClick} disabled={isLoggingOut}>
        <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
        <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
      </Button>
      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed h-screen inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLogoutDialog(false)}
          />

          {/* Dialog */}
          <div className="relative bg-background border border-border rounded-lg shadow-lg p-6 max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                <LogOutIcon className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Confirm Logout
                </h3>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to logout?
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              You will be redirected to the home page and will need to login
              again to access your account.
            </p>

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowLogoutDialog(false)}
                disabled={isLoggingOut}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOutIcon className="h-4 w-4" />
                    Logout
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
