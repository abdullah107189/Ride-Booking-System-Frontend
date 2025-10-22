/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BoltIcon,
  BookOpenIcon,
  Layers2Icon,
  LogOutIcon,
  PinIcon,
  UserPenIcon,
  UserIcon,
  LogInIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";

export default function UserMenu({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) {
  console.log("data", data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  if (isLoading) return <div>Loading...</div>;

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

  // Generate user initials from name
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // If no user data, show login button
  if (!data || !data.name) {
    return (
      <Link to="/login">
        <Button variant="outline" className="flex items-center gap-2">
          <LogInIcon size={16} />
          <span>Login</span>
        </Button>
      </Link>
    );
  }

  // If user data exists, show dropdown menu
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          {data && data.name ? (
            <Avatar>
              <AvatarImage
                src={data.profileImage || "/origin/avatar.jpg"}
                alt="Profile image"
              />
              <AvatarFallback>{getUserInitials(data.name)}</AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <UserIcon className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {data?.name || "Guest User"}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {data?.email || "No email"}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 3</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PinIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 5</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogoutClick} disabled={isLoggingOut}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

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
              <h3 className="text-lg font-semibold text-foreground">Confirm Logout</h3>
              <p className="text-sm text-muted-foreground">Are you sure you want to logout?</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">
            You will be redirected to the home page and will need to login again to access your account.
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
    </>
  );
}
