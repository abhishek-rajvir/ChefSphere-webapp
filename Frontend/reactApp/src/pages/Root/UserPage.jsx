import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import SideBar from "./SideBar";
import CreatorSideBar from "../profiles/Creator/CreatorSideBar";
import FoodieSideBar from "../profiles/Foodie/FoodieSideBar";
// import FoodieSideBar from "../profiles/Foodie/FoodieSideBar";

export default function UserPage({
  user,
  posts,
  newPost,
  updatePost,
  followers,
  profile,
  home,
  categories,
  creators,
  following,
  viewPost,
  search,
  category,
}) {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        {user.type === "CREATOR" ? (
          <CreatorSideBar
            name={user.name}
            postPage={posts}
            newPost={newPost}
            updatePost={updatePost}
            followersPage={followers}
            profilePage={profile}
            details={user}
          />
        ) : (
          <FoodieSideBar
            name={user.name}
            homePage={home}
            postPage={posts}
            followingPage={following}
            categoriesPage={categories}
            creatorsPage={creators}
            profilePage={profile}
            viewPost={viewPost}
            details={user}
            searchPage={search}
            categoryPage={category}
          />
        )}
      </ThemeProvider>
    </>
  );
}
