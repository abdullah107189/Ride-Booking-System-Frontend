/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";

export function HeaderProfile() {
  const { data: userData } = useGetMeQuery(undefined);
  const navigate = useNavigate();

  return (
    <header>
      {/* Your header content */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(`/${userData?.role}/profile`)}
        className="h-9 w-9 rounded-full border border-border"
      >
        <User className="h-5 w-5" />
      </Button>
    </header>
  );
}
