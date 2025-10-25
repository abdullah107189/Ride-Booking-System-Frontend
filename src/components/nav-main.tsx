import { ChevronRight, type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router"; // Import useLocation

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils"; // Import cn for conditional classes

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          // Check if current item is active
          const isItemActive = currentPath === item.url || 
            item.items?.some(subItem => currentPath === subItem.url);
          
          // Check if any sub-item is active
          const isSubItemActive = item.items?.some(subItem => 
            currentPath === subItem.url
          );

          return (
            <Collapsible 
              key={item.title} 
              asChild 
              defaultOpen={isItemActive || item.isActive}
            >
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip={item.title}
                  isActive={isItemActive}
                  className={cn(
                    "transition-colors duration-200",
                    isItemActive && "bg-accent text-accent-foreground"
                  )}
                >
                  <Link to={item.url.trim()}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction 
                        className={cn(
                          "data-[state=open]:rotate-90 transition-transform",
                          isItemActive && "text-accent-foreground"
                        )}
                      >
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          const isSubActive = currentPath === subItem.url;
                          
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton 
                                asChild
                                isActive={isSubActive}
                                className={cn(
                                  "transition-colors duration-200",
                                  isSubActive && "bg-accent text-accent-foreground"
                                )}
                              >
                                <Link to={subItem.url.trim()}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}