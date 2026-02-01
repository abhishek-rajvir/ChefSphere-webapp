import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FetchAvatar, FetchCategory } from "@/service/ImagekitApiService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getYoutubeId } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

import FoodieService from "@/service/FoodieService";

export default function GuestDashBoard() {
  const [posts, setPosts] = useState([]);
  const [creators, setCreators] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCreators, setLoadingCreators] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

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
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    })();

    // Fetch top creators
    (async () => {
      try {
        setLoadingCreators(true);
        const data = await FoodieService.getCreatorsByRange(20);
        setCreators(data);
      } catch (error) {
        console.error("Error fetching creators:", error);
        toast.error("Failed to load creators");
      } finally {
        setLoadingCreators(false);
      }
    })();

    // Fetch categories
    (async () => {
      try {
        setLoadingCategories(true);
        const data = await FoodieService.getCategoryByRange(16);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    })();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-2xl font-bold ">Recipes made with ❤️</h2>
        <Button variant="link" onClick={() => navigate("/posts")}>
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
                  navigate(`/post/${post.pid}`);
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
          <Button variant="link" onClick={() => navigate("/categories")}>
            View all
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {loadingCategories
            ? Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <Skeleton className="w-[120px] h-[120px] rounded-full" />
                  <Skeleton className="h-4 w-[80px]" />
                </div>
              ))
            : categories.map((cat, idx) => {
                // imageUrl declaration removed
                return (
                  <div
                    key={idx}
                    onClick={() =>
                      navigate(
                        `/search?sortBy=category&query=${encodeURIComponent(cat.name.trim())}`,
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
          <Button variant="link" onClick={() => navigate("/creators")}>
            View all
          </Button>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {loadingCreators
            ? Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <Skeleton className="w-[100px] h-[100px] rounded-full" />
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-6 w-[60px] rounded-full" />
                </div>
              ))
            : creators.map((creator, idx) => {
                const name = creator.username || "Creator";
                const creatorUid = creator.uid;
                const creatorId = creator.cid;
                // imageUrl declaration removed

                const handleFollowClick = async (e) => {
                  e.stopPropagation(); // Prevent card navigation
                  console.log("Forbidden request");
                  toast.error("Unauthorized request, please login");
                };

                return (
                  <div
                    key={idx}
                    onClick={() => navigate(`/creators/${creatorId}`)}
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
                      className={`text-xs px-3 py-1 rounded-full transition-colors ${"text-primary border border-primary hover:bg-primary hover:text-white"}`}>
                      {"Follow"}
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
