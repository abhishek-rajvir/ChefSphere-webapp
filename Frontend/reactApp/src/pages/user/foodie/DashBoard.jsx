import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import FoodieService from "@/service/FoodieService";

export default function DashBoard() {
  const [posts, setPosts] = useState([]);
  const [creators, setCreators] = useState([]);
  const [categories, setCategories] = useState([]);
  const [followingState, setFollowingState] = useState({});

  const loadUser = () => {
    const data = sessionStorage.getItem("userCred");
    return data ? JSON.parse(data) : null;
  };
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recipes
    (async () => {
      try {
        const data = await FoodieService.getRecipeByRange(15);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    })();

    // Fetch top creators
    (async () => {
      try {
        const data = await FoodieService.getCreatorsByRange(20);
        setCreators(data);
        // Fetch follow status for each creator
        (async () => {
          try {
            const followPromises = data.map(async (creator) => {
              const creatorId = creator.cid || creator.id;
              try {
                const follows =
                  await FoodieService.doesFollowCreator(creatorId);
                setFollowingState((prev) => ({
                  ...prev,
                  [creatorId]: !!follows,
                }));
              } catch (e) {
                console.error(
                  "Error checking follow status for creator",
                  creatorId,
                  e,
                );
              }
            });
            await Promise.all(followPromises);
          } catch (e) {
            console.error("Error fetching follow statuses:", e);
          }
        })();
      } catch (error) {
        console.error("Error fetching creators:", error);
      }
    })();

    // Fetch categories
    (async () => {
      try {
        const data = await FoodieService.getCategoryByRange(16);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();

    // Fetch followings
    (async () => {
      try {
        const user = loadUser();
        const uid = user?.id || user?.cid;
        if (uid) {
          const data = await FoodieService.getAllFollowing(uid);
          setFollowings(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-2xl font-bold ">Recipes made with ❤️</h2>
        <Button variant="link" onClick={() => navigate("/foodies/posts")}>
          View all
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-4 justify-center">
        {posts.map((post, idx) => {
          // Debug post ID
          console.log("Post structure:", post);
          return (
            <Card
              key={idx}
              onClick={() => {
                const id = post.pid || post.id || post.postId;
                console.log("Navigating to post:", id);
                navigate(`/foodies/posts/${id}`);
              }}
              className="w-[180px] p-0 gap-0 overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="h-[200px] w-full overflow-hidden">
                <img
                  src={
                    "https://img.youtube.com/vi/" +
                    post.videoUrl +
                    "/mqdefault.jpg"
                  }
                  alt="Image not found"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-3 text-center">
                <p className="font-semibold text-sm truncate">
                  {post.recipeName}
                </p>
                <p className="font-semibold text-sm truncate">
                  {post.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Categories</h2>
          <Button
            variant="link"
            onClick={() => navigate("/foodies/categories")}>
            View all
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((cat, idx) => {
            // Replace special characters for URL compatibility
            const safeText = cat.name.replace(/&/g, "+").replace(/\s+/g, "+");
            const imageUrl =
              cat.image ||
              `https://dummyjson.com/image/150x150/fdf2f8/000000?text=${safeText}&fontSize=18`;
            return (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-inherit shadow-md">
                  <img
                    src={imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Top Creators</h2>
          <Button variant="link" onClick={() => navigate("/foodies/creators")}>
            View all
          </Button>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {creators.map((creator, idx) => {
            const name = creator.username || "Creator";
            const creatorId = creator.cid || creator.id;
            const isFollowing = followingState[creatorId] || false;
            const imageUrl =
              creator.pic ||
              `https://dummyjson.com/image/150x150/dcfce7/000000?text=${encodeURIComponent(name.charAt(0).toUpperCase())}&fontSize=40`;

            const handleFollowClick = async () => {
              try {
                if (isFollowing) {
                  await FoodieService.unFollowCreator(creatorId);
                  setFollowingState((prev) => ({
                    ...prev,
                    [creatorId]: false,
                  }));
                } else {
                  await FoodieService.followCreator(creatorId);
                  setFollowingState((prev) => ({ ...prev, [creatorId]: true }));
                }
              } catch (error) {
                console.error("Follow action failed:", error);
                alert("Failed to follow/unfollow. Please try again.");
              }
            };

            return (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-inherit shadow-md ring-2 ring-offset-2 ring-gray-100">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-sm">{name}</span>
                <button
                  onClick={handleFollowClick}
                  className={`text-xs px-3 py-1 rounded-full transition-colors ${
                    isFollowing
                      ? "bg-black text-white dark:bg-white dark:text-black border border-primary"
                      : "text-primary border border-primary hover:bg-primary hover:text-white"
                  }`}>
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
