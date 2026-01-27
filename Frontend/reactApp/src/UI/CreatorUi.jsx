import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { Link } from "react-router-dom";
import CreatorConfig from "@/pages/user/creator/CreatorConfig";
import FoodieService from "@/service/FoodieService";
import { requestLog } from "@/jwt/axios_helper";
import { FollowerTable } from "@/pages/user/creator/FollowerTable";
import { ProfileForm } from "@/pages/user/creator/ProfileForm";
import Settings from "@/pages/profiles/Settings";
import { NewPostForm } from "@/pages/user/creator/post/NewPostForm";
import { UpdatePostForm } from "@/pages/user/creator/post/UpdatePostForm";
import CreatorPosts from "@/pages/user/creator/post/CreatorPosts";
import PostPage from "@/pages/user/creator/post/PostPage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CreatorUi({
  name,
  newPost,
  updatePost,
  postPage,
  followersPage,
  profilePage,
  settingsPage,
  details,
  viewPost,
}) {
  const [followers, setFollowers] = useState([]);

  const navigate = useNavigate();

  const getListOfFollowers = async (name, id) => {
    try {
      requestLog("Fetched all followers of creator " + name + " ID: " + id);
      const data = await FoodieService.getFollowers();
      console.log(data);
      return data;
    } catch (err) {
      return [];
    }
  };

  const loadUser = () => {
    const data = sessionStorage.getItem("userCred");
    return data;
  };

  useEffect(() => {
    const u = loadUser();
    if (!u) {
      navigate("/login", { replace: true });
      return;
    }

    if (followersPage) {
      (async () => {
        const f = await getListOfFollowers(u.name, u.id);
        setFollowers(f);
      })();
    }
  }, [postPage, followersPage, profilePage, settingsPage, viewPost]);

  return (
    <SidebarProvider>
      <AppSidebar name={"👨‍🍳" + name} items={CreatorConfig} />
      <main className="w-full">
        <div className="flex h-14 items-start pt-0 border-b px-4">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <span className="font-semibold whitespace-nowrap">ChefSphere</span>
            &nbsp;
          </div>

          {/* RIGHT */}
          <div className="flex flex-1 justify-end"></div>
        </div>

        {/* Page content */}
        <div className="p-4">
          {postPage &&
            (viewPost ? (
              <PostPage post={viewPost} />
            ) : newPost ? (
              <NewPostForm />
            ) : updatePost > 0 ? (
              <UpdatePostForm id={updatePost} />
            ) : (
              <>
                <CreatorPosts />
              </>
            ))}
          {profilePage && <ProfileForm initialData={details} />}
          {settingsPage && <Settings />}
          {followersPage && <FollowerTable followers={followers} />}
        </div>
        <hr />
        <footer>
          <br />
          <h6 className="text-center">
            Copyright © 2026 ChefSphere. All rights reserved.{" "}
            <Link
              to="/about"
              style={{ textDecoration: "underline", color: "blue" }}>
              about us
            </Link>
          </h6>
        </footer>
      </main>
    </SidebarProvider>
  );
}
