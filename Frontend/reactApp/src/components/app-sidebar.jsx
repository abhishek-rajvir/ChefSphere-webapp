import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import UserService from "@/service/UserService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/context/AuthContext";

export function AppSidebar({ name, items }) {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login", { replace: true });
  };
  const handleLogout = () => {
    UserService.logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <Sidebar>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2">
            <span className="text-lg font-semibold text-foreground">
              {name}
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="flex left">
          <ModeToggle />
          &nbsp; &nbsp;
          {isAuthenticated ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Button onClick={handleLogin}>Login</Button>
          )}
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
