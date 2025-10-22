import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserMenu from "./user-menu";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { ModeToggle } from "./mode-toggle";
import { Link, useLocation } from "react-router";
import { role } from "@/const";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: role.PUBLIC },
  { href: "/about", label: "About", role: role.PUBLIC },
  { href: "/features", label: "Features", role: role.PUBLIC },
  { href: "/login", label: "Login", role: role.PUBLIC },
  { href: "/register", label: "Register", role: role.PUBLIC },
  // dashboard
  { href: "/admin", label: "Dashboard", role: role.ADMIN },
  { href: "/rider", label: "Dashboard", role: role.RIDER },
  { href: "/driver", label: "Dashboard", role: role.DRIVER },
];

export default function NavbarOrigin() {
  const { data: userInfo, isLoading } = useGetMeQuery(undefined);

  const filteredNavigationLinks = navigationLinks.filter((link) => {
    const userIsLoggedIn = !!userInfo?.role;
    const userRole = userInfo?.role;
    if (link.role === role.PUBLIC) {
      if (
        userIsLoggedIn &&
        (link.href === "/login" || link.href === "/register")
      ) {
        return false;
      }
      return true;
    }

    if (!userIsLoggedIn) {
      return false;
    }

    if (link.role === userRole) {
      return true;
    }

    return false;
  });

  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };
  return (
    <header className="border-b md:px-6 sticky top-0 z-50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mxw flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className=" p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-2 md:gap-2">
                  {filteredNavigationLinks.map((link, index) => (
                    <NavigationMenuItem className="w-full" key={index}>
                      <Link
                        to={link.href}
                        className={` py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${
                          isActive(link.href)
                            ? "bg-muted text-primary"
                            : "text-muted-foreground hover:text-primary bg-muted"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-primary hover:text-primary/90 font-bold text-xl"
            >
              RideShare
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="flex-row items-center gap-4">
                {filteredNavigationLinks.map((link, index) => (
                  <NavigationMenuItem className="w-full" key={index}>
                    <Link
                      to={link.href}
                      className={`py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? "bg-muted text-primary"
                          : "text-muted-foreground hover:text-primary bg-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <ModeToggle></ModeToggle>

          {/* User menu */}
          <UserMenu data={userInfo} isLoading={isLoading} />
        </div>
      </div>
    </header>
  );
}
