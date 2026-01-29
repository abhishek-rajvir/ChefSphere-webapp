import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { Outlet } from "react-router-dom";
import { useAuth } from "@/utils/context/AuthContext";
import AdminConfig from "@/pages/user/admin/AdminConfig.jsx";
import { Link } from "react-router-dom";

export default function AdminUi() {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      {/*Sidebar Contents*/}
      <AppSidebar name={"🧑‍💻" + user.username} items={AdminConfig} />
      <main className="w-full">
        <div className="flex h-14 items-start pt-0 border-b px-4">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <span className="font-semibold whitespace-nowrap">ChefSphere</span>
            &nbsp;
          </div>
        </div>

        {/* Page content */}
        <div className="p-4">
          <Outlet />
        </div>

        {/*Footer*/}
        <hr />
        <footer>
          <br />
          <h6 className="text-center">
            Copyright © 2026 ChefSphere. All rights reserved.{" "}
            <Link
              to="/admin/about"
              style={{ textDecoration: "underline", color: "blue" }}>
              about us
            </Link>
          </h6>
        </footer>
      </main>
    </SidebarProvider>
  );
}
