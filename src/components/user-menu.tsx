/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserIcon, LogInIcon } from "lucide-react";
import { Link } from "react-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "./shared/Logout";

export default function UserMenu({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) {
  if (isLoading) return <div>Loading...</div>;

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
          <DropdownMenuItem>
            <Logout></Logout>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
