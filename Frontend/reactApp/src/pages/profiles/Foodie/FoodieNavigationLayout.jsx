import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import NotFoundPage from "../../error/NotFoundPage";
import UserPage from "../../Root/UserPage";
// import LoginForm from "../../Auth/LoginForm";
// import LoginPage from "../../Auth/LoginPage";

export default function FoodieNavigationLayout({ postPage, viewPost }) {
  // param is the name of key
  const parmeter = useParams().param;

  // // If there is no param (route is /creators), show 404
  // // handle invalid ? # urls
  //  if (!parmeter) return <NotFoundPage/>;

  // // If it's a valid number → Creator details page
  // if (/^\d+$/.test(parmeter)) {
  //     return <CreatorPage/>;
  // }
  const data = sessionStorage.getItem("userCred");
  const user = data ? JSON.parse(data) : null;

  if (postPage) {
    if (viewPost) {
      const id = parseInt(useParams().id);
      console.log("viewing post by id", id);
      return <UserPage viewPost={id} user={user} />;
    }
  }
  // Handle keyword routes
  switch (parmeter) {
    case "home":
      return <UserPage home={true} user={user} />;
    case "posts":
      return <UserPage posts={true} user={user} />;
    case "profile":
      return <UserPage profile={true} user={user} />;
    case "categories":
      return <UserPage categories={true} user={user} />;
    case "creators":
      return <UserPage creators={true} user={user} />;
    case "following":
      return <UserPage following={true} user={user} />;
    // case "update":
    //   return <CreatorUpdate />;
    // case "delete":
    //   return <CreatorDelete />;
    default:
      return <NotFoundPage />;
  }
}
