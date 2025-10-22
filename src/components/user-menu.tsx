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
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

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

export default function UserMenu({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) {
  console.log("data", data);
  const navigate = useNavigate();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  if (isLoading) return <div>Loading...</div>;

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      toast.success("Logged out successfully!", {
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
        <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
