import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logout(undefined).unwrap();
      console.log(res);
      dispatch(authApi.util.resetApiState());
      toast.success(res.message || "Logged out successfully!", {
        description: "You have been logged out.",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed", {
        description: "Please try again.",
      });
    }
  };

  return (
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="w-full" disabled={isLoggingOut} variant="ghost">
            <LogOutIcon
              size={16}
              className="mr-2 opacity-60"
              aria-hidden="true"
            />
            <span>Logout</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-xl">
              <LogOutIcon className="h-5 w-5 text-destructive" />
              Confirm Logout
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout? You will be redirected to the
              home page and will need to login again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoggingOut}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleLogout}
              disabled={isLoggingOut}
              asChild
            >
              <Button variant="destructive" className="flex items-center gap-2">
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
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
