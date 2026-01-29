import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { Link, Outlet } from "react-router-dom";
import CreatorConfig from "../pages/user/creator/CreatorConfig";
import { useAuth } from "../utils/context/AuthContext";

export default function CreatorUi() {
  const { user } = useAuth();
  return (
    <SidebarProvider>
      <AppSidebar name={"👨‍🍳" + user.username} items={CreatorConfig} />
      <main className="w-full">
        <div className="flex h-14 items-start pt-0 border-b px-4">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <span className="font-semibold whitespace-nowrap">ChefSphere</span>
            &nbsp;
          </div>
        </div>
        <Outlet />
        <hr />
        <footer>
          <br />
          <h6 className="text-center">
            Copyright © 2026 ChefSphere. All rights reserved.{" "}
            <Link
              to="/creator/about"
              style={{ textDecoration: "underline", color: "blue" }}>
              about us
            </Link>
          </h6>
        </footer>
      </main>
    </SidebarProvider>
  );
}
