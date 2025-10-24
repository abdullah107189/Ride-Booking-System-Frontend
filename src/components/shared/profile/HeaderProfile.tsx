/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { ProfileModal } from "./ProfileModal";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";

export function HeaderProfile() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: userData, refetch } = useGetMeQuery(undefined);
  const navigate = useNavigate();
  const handleProfileUpdate = (updatedData: any) => {
    console.log("Profile updated:", updatedData);
    refetch();
  };
  return (
    <header>
      {/* Your header content */}
      <Button
        variant="ghost"
        size="icon"
        // onClick={() => setIsProfileOpen(true)}
        onClick={() => navigate(`/${userData?.role}/profile`)}
        className="h-9 w-9 rounded-full border border-border"
      >
        <User className="h-5 w-5" />
      </Button>
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={userData}
        onUpdate={handleProfileUpdate}
      />
    </header>
  );
}
