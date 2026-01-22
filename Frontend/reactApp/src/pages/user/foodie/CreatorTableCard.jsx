import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function CreatorTableCard({ creators }) {
  const items = creators || [];
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (items.length === 0) {
    return (
      <div className="text-gray-500 italic text-center p-4">
        No creators found
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-4">
        {currentItems.map((creator) => (
          <Card
            key={creator.id}
            className="w-full overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1">
            <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar Section */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border shadow-sm mx-auto sm:mx-0">
                  <img
                    src={
                      creator.icon ||
                      creator.avatar ||
                      "https://dummyjson.com/image/100x100/e0e0e0/000000?text=Avatar"
                    }
                    alt={creator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name & Rating Section */}
              <div className="flex-shrink-0 text-center sm:text-left min-w-[200px]">
                <h3 className="text-xl font-bold text-foreground">
                  {creator.name}
                </h3>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{creator.rating || "N/A"}</span>
                  <span>({creator.reviews || 0} reviews)</span>
                </div>
              </div>

              {/* Description Section */}
              <div className="flex-grow text-center sm:text-left border-l-0 sm:border-l sm:border-border sm:pl-6">
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {creator.desc || creator.bio || "No description available."}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
