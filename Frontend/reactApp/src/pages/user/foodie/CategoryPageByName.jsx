import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FoodieService from "@/service/FoodieService";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { getYoutubeId } from "@/lib/utils";

export default function CategoryPageByName({ categoryName }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const currentCategory = categoryName || params.categoryName;

  useEffect(() => {
    if (!currentCategory) return;
    (async () => {
      try {
        const data =
          await FoodieService.getPostsContainingCategory(currentCategory);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts by category:", error);
      }
    })();
  }, [currentCategory]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Recipes in {currentCategory}</h2>
      <div className="flex flex-wrap items-center gap-4 justify-center">
        {posts.map((post, idx) => (
          <Card
            key={idx}
            onClick={() => {
              navigate(`/foodies/posts/${post.pid}`);
            }}
            className="w-[180px] p-0 gap-0 overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <div className="h-[200px] w-full overflow-hidden">
              <img
                src={
                  "https://img.youtube.com/vi/" +
                  getYoutubeId(post.videoUrl || post.videoURL) +
                  "/mqdefault.jpg"
                }
                alt={post.recipeName}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardContent className="p-3 text-center">
              <p className="font-semibold text-sm truncate">
                {post.recipeName}
              </p>
              <p className="font-semibold text-sm truncate text-muted-foreground">
                {post.description}
              </p>
            </CardContent>
          </Card>
        ))}
        {posts.length === 0 && (
          <p className="text-muted-foreground">
            No recipes found for this category.
          </p>
        )}
      </div>
    </div>
  );
}
