import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FetchAvatar, FetchCategory } from "@/service/ImagekitApiService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getYoutubeId } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

import FoodieService from "@/service/FoodieService";
import { useAuth } from "../../../utils/context/AuthContext";

export default function FoodieDashBoard() {
  const [posts, setPosts] = useState([]);
  const [creators, setCreators] = useState([]);
  const [categories, setCategories] = useState([]);
  const [followingState, setFollowingState] = useState({});
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recipes
    (async () => {
      try {
        setLoading(true);
        const data = await FoodieService.getRecipeByRange(15);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    })();

    // Fetch top creators
    (async () => {
      try {
        const data = await FoodieService.getCreatorsByRange(20);
        setCreators(data);
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
        const uid = user?.id;
        if (uid) {
          const data = await FoodieService.getAllFollowing();
          const followState = {};
          if (Array.isArray(data)) {
            data.forEach((item) => {
              const followedCid = item.cid;
              if (followedCid) followState[String(followedCid)] = true;
            });
          }
          setFollowingState(followState);
        }
      } catch (error) {
        console.error("Error fetching following:", error);
      }
    })();
  }, [user?.id]);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-2xl font-bold ">Recipes made with ❤️</h2>
        <Button variant="link" onClick={() => navigate("/foodie/posts")}>
          View all
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-4 justify-center">
        {loading ? (
          <div className="w-full flex flex-col items-center gap-4">
            <p className="text-muted-foreground animate-pulse font-medium">
              Loading your feed...
            </p>
            <div className="flex flex-wrap items-center gap-4 justify-center w-full">
              {Array.from({ length: 15 }).map((_, idx) => (
                <div key={idx} className="flex flex-col space-y-3 w-[180px]">
                  <Skeleton className="h-[200px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          posts.map((post, idx) => {
            return (
              <Card
                key={idx}
                onClick={() => {
                  navigate(`/foodie/posts/${post.pid}`);
                }}
                className="w-[180px] p-0 gap-0 overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="h-[200px] w-full overflow-hidden">
                  <img
                    src={
                      "https://img.youtube.com/vi/" +
                      getYoutubeId(post.videoUrl || post.videoURL) +
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
          })
        )}
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Categories</h2>
          <Button variant="link" onClick={() => navigate("/foodie/categories")}>
            View all
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((cat, idx) => {
            const imageUrl =
              cat.image ||
              `https://placehold.jp/22/fdf2f8/000000/150x150.png?text=${encodeURIComponent(cat.name.trim())}`;
            return (
              <div
                key={idx}
                onClick={() =>
                  navigate(
                    `/foodie/search?sortBy=category&query=${encodeURIComponent(cat.name.trim())}`,
                  )
                }
                className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-inherit shadow-md flex items-center justify-center bg-[#fdf2f8]">
                  <FetchCategory
                    categoryName={cat.name}
                    size={120}
                    className="w-full h-full object-cover"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <span className="font-semibold text-base max-w-[120px] text-center px-1 break-words">
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Top Creators</h2>
          <Button variant="link" onClick={() => navigate("/foodie/creators")}>
            View all
          </Button>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {creators.map((creator, idx) => {
            const name = creator.username || "Creator";
            const creatorUid = creator.uid;
            const creatorId = creator.cid;
            const isFollowing = followingState[String(creatorId)] || false;
            const imageUrl =
              creator.pic ||
              `https://dummyjson.com/image/150x150/dcfce7/000000?text=${encodeURIComponent(name.charAt(0).toUpperCase())}&fontSize=40`;

            const handleFollowClick = async (e) => {
              e.stopPropagation(); // Prevent card navigation
              try {
                if (isFollowing) {
                  await FoodieService.unFollowCreator(creatorId);
                  setFollowingState((prev) => ({
                    ...prev,
                    [creatorId]: false,
                  }));
                  toast.success("Unfollowed");
                } else {
                  await FoodieService.followCreator(creatorId);
                  setFollowingState((prev) => ({ ...prev, [creatorId]: true }));
                  toast.success("Followed");
                }
              } catch (error) {
                console.error("Follow action failed:", error);
                toast.error("Failed to follow/unfollow. Please try again.");
              }
            };

            return (
              <div
                key={idx}
                onClick={() => navigate(`/foodie/creators/${creatorId}`)}
                className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-inherit shadow-md ring-2 ring-offset-2 ring-gray-100">
                  <FetchAvatar
                    userId={creatorUid}
                    size={102}
                    alt={name}
                    className="w-full h-full object-cover"
                    style={{ width: "100%", height: "100%" }}
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
