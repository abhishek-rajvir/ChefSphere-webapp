import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import InputClearDemo from "@/core/template/InputClear";
import FoodieConfig from "@/pages/user/foodie/FoodieConfig";
import DashBoard from "@/pages/user/foodie/DashBoard";
import { ProfileForm } from "@/pages/user/creator/ProfileForm";
import Settings from "@/pages/profiles/Settings";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AllCategoryPage from "@/pages/user/foodie/AllCategoryPage";
import CreatorPage from "@/pages/user/foodie/CreatorPage";
import CreatorsPage from "@/pages/user/foodie/CreatorsPage";
import AllPostPage from "@/pages/user/foodie/AllPostPage";
import FollowingTable from "@/pages/user/foodie/FollowingTable";
import PostPage from "@/pages/user/creator/post/PostPage";
import SearchPage from "@/pages/user/foodie/SearchPage";
import CategoryPageByName from "@/pages/user/foodie/CategoryPageByName";

export default function FoodieUi({
  name,
  homePage,
  searchPage,
  postPage,
  followingPage,
  profilePage,
  settingsPage,
  details,
  categoriesPage,
  creatorsPage,
  creatorDetailsPage,
  viewPost,
  categoryPage,
}) {
  const [following, setFollowing] = useState([]);
  const navigate = useNavigate();

  const loadUser = () => {
    const data = sessionStorage.getItem("userCred");
    return data ? JSON.parse(data) : null;
  };

  useEffect(() => {
    const u = loadUser();
    if (!u) {
      navigate("/login", { replace: true });
      return;
    }

    // Add any page-specific data loading here if needed
  }, [
    homePage,
    postPage,
    followingPage,
    profilePage,
    settingsPage,
    categoriesPage,
    creatorsPage,
    creatorDetailsPage,
    viewPost,
    categoryPage,
  ]);

  return (
    <SidebarProvider>
      <AppSidebar name={"🍽️" + name} items={FoodieConfig} />
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
          {homePage && <DashBoard />}
          {postPage && <AllPostPage />}
          {viewPost && <PostPage post={viewPost} />}
          {profilePage && <ProfileForm initialData={details} />}
          {settingsPage && <Settings />}
          {followingPage && <FollowingTable />}
          {categoriesPage && <AllCategoryPage />}
          {categoryPage && <CategoryPageByName categoryName={categoryPage} />}
          {creatorsPage && <CreatorsPage />}
          {creatorDetailsPage !== undefined && creatorDetailsPage !== null && (
            <CreatorPage cid={creatorDetailsPage} />
          )}
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
