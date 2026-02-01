import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FoodieService from "@/service/FoodieService";
import { useNavigate } from "react-router-dom";
import { getYoutubeId } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";

export default function FoodieAllPosts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 20;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await FoodieService.getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Recipes</h2>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages || 1}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4 justify-center">
        {loading ? (
          <div className="w-full flex flex-col items-center gap-4">
            <p className="text-muted-foreground animate-pulse font-medium">
              Loading delicacies...
            </p>
            <div className="flex flex-wrap items-center gap-4 justify-center w-full">
              {Array.from({ length: 20 }).map((_, idx) => (
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
          currentPosts.map((post, idx) => (
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
                <p className="font-semibold text-sm truncate text-muted-foreground">
                  {post.description}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && !loading && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={currentPage === 1}>
            Previous
          </Button>
          <div className="flex gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}>
                  {pageNum}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
