import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import NotFoundPage from "../../error/NotFoundPage";
import UserPage from "../../Root/UserPage";

export default function FoodieNavigationLayout({
  postPage,
  viewPost,
  categoryPage,
  searchPage,
  creatorPage,
}) {
  // param is the name of key
  const params = useParams();
  const [searchParams] = useSearchParams();
  const parmeter = params.param;

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
      const id = parseInt(params.id);
      console.log("viewing post by id", id);
      return <UserPage viewPost={id} user={user} />;
    }
  }
  if (categoryPage) {
    const categoryName = params.categoryName;
    console.log("viewing post by categoryName", categoryName);
    return <UserPage category={categoryName} user={user} />;
  }
  if (creatorPage) {
    const creatorId = parseInt(params.id);
    console.log("viewing creator by id", creatorId);
    return <UserPage creator={creatorId} user={user} />;
  }
  if (searchPage) {
    const sortBy = searchParams.get("sortBy");
    const query = searchParams.get("query");
    console.log("searching by", sortBy, query);
    return <UserPage search={{ query, sortBy }} user={user} />;
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
    default:
      return <NotFoundPage />;
  }
}
