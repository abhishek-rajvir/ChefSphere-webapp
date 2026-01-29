import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import SearchBar from "@/core/template/SearchBar";
import { Link, Outlet } from "react-router-dom";
import GuestConfig from "@/pages/user/guest/GuestConfig";

export default function GuestUi() {
  return (
    <SidebarProvider>
      <AppSidebar name={"🕵️" + "Guest"} items={GuestConfig} />
      <main className="w-full">
        <div className="flex h-14 items-start pt-0 border-b px-4">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <span className="font-semibold whitespace-nowrap">ChefSphere</span>
            &nbsp;
          </div>

          {/* RIGHT */}
          <div className="flex flex-1 justify-end">
            <div className="w-full max-w-sm">
              <SearchBar />
            </div>
          </div>
        </div>
        <Outlet />
        <hr />
        <footer>
          <br />
          <h6 className="text-center">
            Copyright © 2026 ChefSphere. All rights reserved.{" "}
            <Link
              to="/about"
              style={{ textDecoration: "underline", color: "lightblue" }}>
              about us
            </Link>
          </h6>
        </footer>
      </main>
    </SidebarProvider>
  );
}
