import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FoodieService from "@/service/FoodieService";
import { getYoutubeId } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/utils/context/AuthContext";

export default function SearchPage() {
  const [params] = useSearchParams();
  const initialQuery = params.get("query");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState(params.get("sortBy") || "title");
  const [durationRange, setDurationRange] = useState([30]);

  const { isAuthenticated } = useAuth();

  const postsPerPage = 15;
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialQuery && filterType !== "duration") return;

    let cancelled = false;

    const fetchResults = async () => {
      try {
        setLoading(true);
        let data = [];

        switch (filterType) {
          case "title":
            data = await FoodieService.getPostsContainingTitle(initialQuery);
            break;

          case "category":
            data = await FoodieService.getPostsContainingCategory(initialQuery);
            break;

          case "duration":
            data = await FoodieService.getPostsByDuration(durationRange[0]);
            break;

          default:
            data = await FoodieService.getPostsContainingTitle(initialQuery);
        }

        if (!cancelled) {
          setResults(data || []);
          setCurrentPage(1);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Error fetching search results:", error);
          setResults([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchResults();

    return () => {
      cancelled = true;
    };
  }, [initialQuery, filterType, durationRange[0]]);

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

  return (
    <div className="p-4 space-y-6">
      {/* Search Header & Filters */}
      <div className="flex flex-col gap-4 text-center items-center">
        <h2 className="text-2xl font-bold">
          Search Results
          {filterType !== "duration" && (
            <>
              {" "}
              for: <span className="text-primary italic">"{initialQuery}"</span>
            </>
          )}
        </h2>

        {/* Filters Container */}
        <div className="flex flex-col sm:flex-row gap-6 items-center bg-muted/30 p-4 rounded-lg border w-full max-w-2xl">
          <div className="flex items-center gap-2">
            <Label
              htmlFor="filter-type"
              className="whitespace-nowrap font-medium">
              Filter By:
            </Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filterType === "duration" && (
            <div className="flex items-center gap-4 flex-1 w-full max-w-xs">
              <Label className="whitespace-nowrap">
                Max Time: {durationRange[0]}m
              </Label>
              <Slider
                value={durationRange}
                onValueChange={setDurationRange}
                max={120}
                step={5}
                className="w-full"
              />
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          {results.length}{" "}
          {filterType === "category" ? "categories" : "recipes"} found
          {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
        </p>
      </div>

      {/* while loading show pulsing text*/}
      {loading ? (
        <div className="p-12 text-center text-lg font-medium text-muted-foreground animate-pulse">
          Searching for delicacies...
        </div>
      ) : (
        // else show data
        <div className="flex flex-wrap items-center gap-4 justify-center">
          {currentPosts.map((post, idx) => (
            <Card
              key={idx}
              onClick={() => {
                isAuthenticated
                  ? navigate(`/foodie/posts/${post.pid}`)
                  : navigate(`/post/${post.pid}`);
              }}
              className="w-[180px] p-0 gap-0 overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 cursor-pointer bg-card">
              <div className="h-[200px] w-full overflow-hidden relative group">
                <img
                  src={
                    "https://img.youtube.com/vi/" +
                    getYoutubeId(post.videoURL || post.videoUrl) +
                    "/mqdefault.jpg"
                  }
                  alt={post.recipeName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
              <CardContent className="p-3 text-center">
                <p
                  className="font-semibold text-sm truncate"
                  title={post.recipeName}>
                  {post.recipeName}
                </p>
                <p className="text-muted-foreground text-xs truncate">
                  {post.prepTime ? `${post.prepTime} mins` : post.description}
                </p>
              </CardContent>
            </Card>
          ))}

          {results.length === 0 && (
            <div className="w-full py-12 text-center text-muted-foreground flex flex-col items-center gap-2">
              <span className="text-4xl">🥘</span>
              <p>No recipes found matching your criteria.</p>
              <Button variant="link" onClick={() => window.location.reload()}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      )}

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
