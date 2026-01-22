import {
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import InputClearDemo from "@/core/template/InputClear";
import NavBar from "@/pages/Root/NavBar";
import FoodieConfig from "@/pages/user/foodie/FoodieConfig";
import CreatorConfig from "@/pages/user/creator/CreatorConfig";
import PostCard from "@/core/template/PostCard";
import { Button } from "@/components/ui/button";
import PostTable from "@/pages/user/creator/post/PostTable";
import { FollowerTable } from "@/pages/user/creator/FollowerTable";
import { ProfileForm } from "@/pages/user/creator/ProfileForm";
import { NewPostForm } from "@/pages/user/creator/post/NewPostForm";
import { UpdatePostForm } from "@/pages/user/creator/post/UpdatePostForm";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CreatorSideBar({
  name,
  newPost,
  updatePost,
  postPage,
  followersPage,
  profilePage,
  details,
}) {
  const [followers, setFollowers] = useState([]);

  const navigate = useNavigate();

  const getListOfFollowers = async (name, id) => {
    try {
      requestLog("Fetched all followers of creator " + name + " ID: " + id);
      const data = await CreatorService.getFollowers(id);
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

  // const getPostsById = async (name, id) => {
  //   try {
  //     requestLog("Fetched creator posts for " + name);
  //     const data = await CreatorService.getCreatorsPosts(id);
  //     console.log(data);
  //     return data;
  //   } catch (err) {
  //     return [];
  //   }
  // };

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
  }, [postPage, followersPage, profilePage]);

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
        <div className="p-4">
          {postPage &&
            (newPost ? (
              <NewPostForm />
            ) : updatePost > 0 ? (
              <UpdatePostForm id={updatePost} />
            ) : (
              <>
                <div className="flex justify-end mb-4">
                  <Button onClick={() => navigate("/creators/posts/new")}>
                    New Post
                  </Button>
                </div>
                <PostTable cid={details.id} />
              </>
            ))}
          {profilePage && <ProfileForm initialData={details} />}
          {followersPage && <FollowerTable followers={followers} />}
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
            Copyright © 2026 ChefSphere. All rights reserved.
          </h6>
        </footer>
      </main>
    </SidebarProvider>
  );
}
