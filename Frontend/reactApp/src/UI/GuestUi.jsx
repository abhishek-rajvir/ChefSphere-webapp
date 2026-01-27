import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import InputClearDemo from "@/core/template/InputClear";
import GuestDashBoard from "@/pages/user/guest/GuestDashBoard";
import { Link } from "react-router-dom";
import AllCategoryPage from "@/pages/user/foodie/AllCategoryPage";
import CreatorPage from "@/pages/user/foodie/CreatorPage";
import CreatorsPage from "@/pages/user/foodie/CreatorsPage";
import AllPostPage from "@/pages/user/foodie/AllPostPage";
import PostPage from "@/pages/user/creator/post/PostPage";
import SearchPage from "@/pages/user/foodie/SearchPage";
import CategoryPageByName from "@/pages/user/foodie/CategoryPageByName";
import GuestConfig from "@/pages/user/guest/GuestConfig";
import GuestAllPosts from "../pages/user/guest/GuestAllPosts";
import GuestPostDetails from "../pages/user/guest/GuestPostDetails";

export default function GuestUi({
  name,
  homePage,
  searchPage,
  postPage,
  categoriesPage,
  creatorsPage,
  creatorDetailsPage,
  viewPost,
  categoryPage,
}) {
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
              <InputClearDemo />
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4">
          {homePage && <GuestDashBoard />}
          {postPage && <GuestAllPosts />}
          {viewPost && <GuestPostDetails />}
          {categoriesPage && <AllCategoryPage />}
          {categoryPage && <CategoryPageByName categoryName={categoryPage} />}
          {creatorsPage && <CreatorsPage />}
          {creatorDetailsPage && <CreatorPage cid={creatorDetailsPage} />}
          {searchPage && (
            <SearchPage sortBy={searchPage.sortBy} query={searchPage.query} />
          )}
        </div>
        <hr />
        <footer>
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
