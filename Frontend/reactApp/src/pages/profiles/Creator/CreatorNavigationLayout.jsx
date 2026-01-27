import { useParams } from "react-router-dom";
import NotFoundPage from "../../error/NotFoundPage";
import UserPage from "../../Root/UserPage";

export default function CreatorNavigationLayout({
  postPage,
  newPost,
  updatePost,
  viewPost,
  creatorPage,
}) {
  // param is the name of key
  const params = useParams();
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

  if (creatorPage) {
    return <UserPage creator={true} user={user} />;
  }
  if (postPage) {
    if (newPost) {
      return <UserPage posts={true} newPost={true} user={user} />;
    } else if (updatePost) {
      // Use "id" because the route is "post/:id/edit"
      const id = parseInt(useParams().id);
      console.log("updating post id", id);
      return <UserPage posts={true} updatePost={id} user={user} />;
    } else if (viewPost) {
      // Use "id" because the route is "post/:id"
      const id = parseInt(useParams().id);
      console.log("viewing post id", id);
      return <UserPage posts={true} viewPost={id} user={user} />;
    } else {
      return <UserPage posts={true} user={user} />;
    }
  }
  // Handle keyword routes
  switch (parmeter) {
    case "home":
      return <UserPage posts={true} user={user} />;
    case "profile":
      return <UserPage profile={true} user={user} />;
    case "followers":
      return <UserPage followers={true} user={user} />;
    case "settings":
      return <UserPage settings={true} user={user} />;
    default:
      return <NotFoundPage />;
  }
}
