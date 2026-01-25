import {
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import InputClearDemo from "../../core/template/InputClear";
import NavBar from "./NavBar";
import FoodieConfig from "../user/foodie/FoodieConfig";
import CreatorConfig from "../user/creator/CreatorConfig";
import PostCard from "../../core/template/PostCard";
import { Button } from "@/components/ui/button";
import PostTable from "../user/creator/post/PostTable";
import { FollowerTable } from "../user/creator/FollowerTable";
import { ProfileForm } from "../user/creator/ProfileForm";
import PostPage from "../user/creator/post/PostPage";
import DashBoard from "../user/foodie/DashBoard";
import FollowingTable from "../user/foodie/FollowingTable";
import SearchPostCard from "../user/foodie/SearchPage";
import CreatorTableCard from "../user/foodie/CreatorTableCard";
import { Link } from "react-router-dom";

export default function SideBar({
  name,
  type,
  posts,
  followers,
  profile,
  creators,
}) {
  return type === "creator" ? (
    <SidebarProvider>
      <AppSidebar name={name} items={CreatorConfig} />
      <main className="flex flex-col min-h-screen w-full">
        <div className="flex h-14 items-start pt-0 border-b px-4">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <span className="font-semibold whitespace-nowrap">ChefSphere</span>
            &nbsp;
          </div>

          {/* CENTER 
          <div className="flex flex-1 justify-center">
            <NavBar />
          </div> */}

          {/* RIGHT */}
          <div className="flex flex-1 justify-end">
            <div className="w-full max-w-sm">
              <InputClearDemo />
            </div>
          </div>
        </div>

        {/* Page content */}
        {/* <div className="min-h-screen flex-col flex center items-center"> */}
        <div className="flex-1 p-4">
          {posts && (
            <>
              <div className="flex justify-end mb-4">
                <Button>New Post</Button>
              </div>
              <PostTable posts={posts} />
            </>
          )}
          {profile && <ProfileForm initialData={profile} />}
          {followers && <FollowerTable followers={followers} />}
          {/* <div>
            <header className="flex justify-between items-center">
              <h4>Top Categories</h4>
              <Button>Show all</Button>
            </header>
            <div className="container py-6">
              <PostCard limit={3} />
              <br />
              <hr />
              <br />
            </div>
          </div>
          <div>
            <h4 className="text-left">Top Creators </h4>
            <div className="container py-6">
              <PostCard limit={3} />
              <br />
              <hr />
              <br />
            </div>
          </div> */}
        </div>
        <hr />
        <footer>
          <br />
          <h6 className="text-center">
            Copyright © 2026 ChefSphere. All rights reserved.{" "}
          </h6>
          <Button
            // variant="outline"
            size="sm"
            onClick={() => navigate("/about")}>
            Contact Us
          </Button>
        </footer>
      </main>
    </SidebarProvider>
  ) : (
    <>
      <SidebarProvider>
        <AppSidebar name={name} items={FoodieConfig} />

        <main className="flex flex-col min-h-screen w-full">
          <div className="flex h-14 items-start pt-0 border-b px-4">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <span className="font-semibold whitespace-nowrap">
                ChefSphere
              </span>
              &nbsp;
            </div>

            {/* CENTER 
          <div className="flex flex-1 justify-center">
            <NavBar />
          </div> */}

            {/* RIGHT */}
            <div className="flex flex-1 justify-end">
              <div className="w-full max-w-sm">
                <InputClearDemo />
              </div>
            </div>
          </div>

          {/* Page content */}
          <div className="flex-1 flex justify-center">
            <div className="container py-6">
              <CreatorTableCard creators={creators} />
              {/* <SearchPostCard posts={posts} /> */}
              {/* <DashBoard /> */}
              {/* <PostPage /> */}
              {/* <FollowingTable followings={followers} /> */}
            </div>
          </div>
          <hr />
          <footer>
            <br />
            <h6 className="text-center">
              Copyright © 2026 ChefSphere. All rights reserved.{" "}
              <Button variant="outline" size="sm">
                Contact
              </Button>{" "}
              <Link to="/about">About Us</Link>
            </h6>
          </footer>
        </main>
      </SidebarProvider>
    </>
  );
}
