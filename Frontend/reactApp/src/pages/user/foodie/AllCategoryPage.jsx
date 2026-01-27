import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FoodieService from "@/service/FoodieService";
import { FetchCategory } from "@/service/ImagekitApiService";
import { useNavigate } from "react-router-dom";

export default function AllCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await FoodieService.getAllCategory();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Categories</h2>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages || 1}
        </span>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {currentCategories.map((cat, idx) => {
          const imageUrl =
            cat.image ||
            `https://placehold.jp/22/fdf2f8/000000/150x150.png?text=${encodeURIComponent(cat.name.trim())}`;
          return (
            <div
              key={idx}
              onClick={() =>
                navigate(
                  `/foodies/search?sortBy=category&query=${encodeURIComponent(cat.name.trim())}`,
                )
              }
              className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-inherit shadow-md flex items-center justify-center bg-[#fdf2f8]">
                <FetchCategory
                  categoryName={cat.name}
                  size={120}
                  className={`w-full h-full ${cat.image ? "object-cover" : "object-cover"}`}
                />
              </div>
              <span className="font-semibold text-base max-w-[120px] text-center px-1 break-words">
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>

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
