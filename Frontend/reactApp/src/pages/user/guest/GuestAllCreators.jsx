import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FoodieService from "@/service/FoodieService";
import { FetchAvatar } from "@/service/ImagekitApiService";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function GuestAllCreators() {
  const [creators, setCreators] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  const handleFollowClick = (e) => {
    e.stopPropagation();
    toast.error("Unauthorized request, please login");
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await FoodieService.getCreatorsByRange(100);
        setCreators(data);
      } catch (error) {
        console.error("Error fetching creators:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalPages = Math.ceil(creators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCreators = creators.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Creators</h2>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages || 1}
        </span>
      </div>

      {loading ? (
        <div className="w-full flex flex-col items-center gap-4">
          <p className="text-muted-foreground animate-pulse font-medium">
            Loading creators...
          </p>
          <div className="flex flex-wrap gap-6 justify-center w-full">
            {Array.from({ length: 20 }).map((_, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <Skeleton className="w-[100px] h-[100px] rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {currentCreators.map((creator, idx) => {
            const name = creator.username || "Creator";
            const creatorUid = creator.uid;
            const creatorId = creator.cid;
            return (
              <div
                key={idx}
                onClick={() => navigate(`/creators/${creatorId}`)}
                className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-inherit shadow-md ring-2 ring-offset-2 ring-gray-100">
                  <FetchAvatar
                    userId={creatorUid}
                    size={100}
                    alt={name}
                    className="w-full h-full object-cover"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <span className="font-semibold text-sm">{name}</span>
                <button
                  onClick={handleFollowClick}
                  className={`text-xs px-3 py-1 rounded-full transition-colors ${"bg-black text-white dark:bg-white dark:text-black border border-primary"}`}>
                  Follow
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
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
