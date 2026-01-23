import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FoodieService from "@/service/FoodieService";
import { getYoutubeId } from "@/lib/utils";

export default function SearchPage({ query, sortBy }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;

    (async () => {
      try {
        setLoading(true);
        let data;
        if (sortBy === "category") {
          data = await FoodieService.getPostsContainingCategory(query);
        } else {
          // Default to title search
          data = await FoodieService.getPostsContainingTitle(query);
        }
        setResults(data || []);
        setCurrentPage(1); // Reset to first page on new search
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [query, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(results.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = results.slice(startIndex, startIndex + postsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-lg font-medium">
        Searching for delicacies...
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-2xl font-bold">
          Search results for:{" "}
          <span className="text-primary italic">"{query}"</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          {results.length} {sortBy === "category" ? "categories" : "recipes"}{" "}
          found
          {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 justify-center">
        {currentPosts.map((post, idx) => (
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
                  getYoutubeId(post.videoURL || post.videoUrl) +
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
              <p className="text-muted-foreground text-xs truncate">
                {post.description}
              </p>
            </CardContent>
          </Card>
        ))}

        {results.length === 0 && !loading && (
          <div className="w-full py-12 text-center text-muted-foreground">
            No {sortBy === "category" ? "categories" : "recipes"} found matching
            your search.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8 pb-8">
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
