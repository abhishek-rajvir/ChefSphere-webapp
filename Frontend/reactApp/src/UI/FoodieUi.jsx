import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import SearchBar from "@/core/template/SearchBar";
import FoodieConfig from "@/pages/user/foodie/FoodieConfig";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../utils/context/AuthContext";

export default function FoodieUi() {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <AppSidebar name={"🍽️" + user.username} items={FoodieConfig} />
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

        {/* Page content */}
        <div className="p-4">
          <Outlet />
        </div>
        <hr />
        <footer>
          <br />
          <h6 className="text-center">
            Copyright © 2026 ChefSphere. All rights reserved.{" "}
            <Link
              to="/foodie/about"
              style={{ textDecoration: "underline", color: "lightblue" }}>
              about us
            </Link>
          </h6>
        </footer>
      </main>
    </SidebarProvider>
  );
}
