/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { ProfileModal } from "./ProfileModal";

export function HeaderProfile() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: "68f9b732e0f469a0192ce1bb",
    name: "rider 1",
    email: "rider1@gmail.com",
    phone: "01771542594",
    role: "rider",
    isBlocked: false,
    isOnline: true,
    createdAt: "2025-10-23T05:03:46.954Z",
    updatedAt: "2025-10-24T01:58:59.634Z",
  });

  const handleUpdateProfile = (updatedData: any) => {
    // Call your API to update user profile
    console.log("Update profile:", updatedData);
    setCurrentUser({ ...currentUser, ...updatedData });
  };

  return (
    <header>
      {/* Your header content */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsProfileOpen(true)}
        className="h-9 w-9 rounded-full"
      >
        <User className="h-5 w-5" />
      </Button>
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        onUpdate={handleUpdateProfile}
      />
    </header>
  );
}
