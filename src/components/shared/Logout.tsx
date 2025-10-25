import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
// ✅ Shadcn AlertDialog কম্পোনেন্টগুলো ইম্পোর্ট করা হলো
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
} from "@/components/ui/alert-dialog"; // ধরে নিলাম আপনার পথ ঠিক আছে

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // isLoggingOut স্টেটটি useLogoutMutation থেকে আসছে, যা একদম ঠিক আছে
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  // ❌ showLogoutDialog স্টেট এখন প্রয়োজন নেই, কারণ AlertDialog নিজেই এটি হ্যান্ডেল করে

  const handleLogout = async () => {
    try {
      // এই ফাংশনটি AlertDialogAction এ সরাসরি কল হবে
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
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


  return (
    <div className="">
      <AlertDialog>
        {" "}
        {/* ✅ AlertDialog শুরু */}
        {/*
          AlertDialogTrigger: এই বাটনটি ক্লিক করলেই ডায়ালগ ওপেন হবে।
          আপনার আগের লগআউট বাটনটি এখন AlertDialogTrigger-এর ভেতরে থাকবে।
        */}
        <AlertDialogTrigger asChild>
          <Button
            className="w-full"
            // onClick={handleLogoutClick} // ❌ আর প্রয়োজন নেই
            disabled={isLoggingOut}
            variant="ghost" // মেনু আইটেমের জন্য সাধারণত ghost বাটন ব্যবহার হয়, আপনি চাইলে w-full রাখতে পারেন
          >
            <LogOutIcon
              size={16}
              className="mr-2 opacity-60"
              aria-hidden="true"
            />
            <span>Logout</span>
          </Button>
        </AlertDialogTrigger>
        {/* AlertDialogContent: আপনার কাস্টম মোডালের সমস্ত কন্টেন্ট এখন এখানে থাকবে */}
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
            {/* Cancel Button */}
            <AlertDialogCancel disabled={isLoggingOut}>
              Cancel
            </AlertDialogCancel>

            {/* Logout/Continue Button */}
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
      </AlertDialog>{" "}
      {/* ✅ AlertDialog শেষ */}
    </div>
  );
}
