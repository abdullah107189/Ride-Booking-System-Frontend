// components/NavbarOrigin.tsx
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
import Logo from "./shared/Logo";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: role.PUBLIC },
  { href: "/about", label: "About", role: role.PUBLIC },
  { href: "/features", label: "Features", role: role.PUBLIC },
  { href: "/contact", label: "Contact", role: role.PUBLIC },
  { href: "/faq", label: "FAQ", role: role.PUBLIC },
  { href: "/login", label: "Login", role: role.PUBLIC },
  { href: "/register", label: "Register", role: role.PUBLIC },
  // dashboard links
  { href: "/admin", label: "Dashboard", role: role.ADMIN },
  { href: "/rider", label: "Dashboard", role: role.RIDER },
  { href: "/driver", label: "Dashboard", role: role.DRIVER },
];

export default function NavbarOrigin() {
  const { data: userInfo, isLoading } = useGetMeQuery(undefined);
  const filteredNavigationLinks = navigationLinks.filter((link) => {
    const userIsLoggedIn = !!userInfo?.role;
    const userRole = userInfo?.role;

    // Logic to hide Login/Register if logged in
    if (
      userIsLoggedIn &&
      (link.href === "/login" || link.href === "/register")
    ) {
      return false;
    }

    if (link.role === role.PUBLIC) {
      return true;
    }

    // Logic to show dashboard links based on role
    if (userIsLoggedIn && link.role === userRole) {
      return true;
    }

    return false;
  });

  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    // Check if path starts with the link's href (e.g., /admin includes /admin/settings)
    return location.pathname.startsWith(path);
  };

  return (
    // IMPROVEMENT: Added px-4 for better mobile padding on the header bar itself.
    <header className="border-b fixed w-full px-4 md:px-6 top-0 z-50 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="mxw flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-6">
          <Logo />

          {/* 1. Mobile menu trigger (Popover) */}
          <Popover>
            <PopoverTrigger asChild>
              {/* IMPROVEMENT: Made the button larger on mobile for easier tap targets */}
              <Button
                className="group size-10 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={20} // Increased size
                  height={20} // Increased size
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Hamburger menu animated paths (kept original logic) */}
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

            {/* 2. Mobile Popover Content */}
            <PopoverContent align="start" className="w-60 p-1 md:hidden">
              <NavigationMenu className="w-full max-w-none">
                {/* IMPROVEMENT: Cleaner spacing and w-full added to Nav list */}
                <NavigationMenuList className="flex-col w-full items-start gap-1 p-2">
                  {filteredNavigationLinks.map((link, index) => (
                    <NavigationMenuItem className="w-full" key={index}>
                      <Link
                        to={link.href}
                        // IMPROVEMENT: Simpler mobile link styling with focus/hover
                        className={`w-full py-2 px-3 rounded-md flex items-center text-sm font-medium transition-colors ${
                          isActive(link.href)
                            ? "bg-primary text-primary-foreground hover:bg-primary/90" // Active state clear
                            : "hover:bg-accent hover:text-accent-foreground text-foreground" // Inactive state clean
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

          {/* 3. Desktop Navigation menu */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="flex-row items-center gap-1">
              {filteredNavigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <Link
                    to={link.href}
                    // IMPROVEMENT: Refined desktop link styling (removed bg-muted for inactive)
                    className={`py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-primary/10 text-primary font-semibold" // Active: Highlight with primary color
                        : "text-foreground hover:bg-muted/50 hover:text-primary" // Inactive: Clean hover effect
                    }`}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <ModeToggle />

          {/* User menu */}
          <UserMenu data={userInfo} isLoading={isLoading} />
        </div>
      </div>
    </header>
  );
}
