import { useState, useEffect } from "react";
import FoodieService from "@/service/FoodieService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function FollowingTable() {
  const [followings, setFollowings] = useState([]);

  // Fetch followings for current user
  useEffect(() => {
    (async () => {
      try {
        const item = sessionStorage.getItem("userCred");
        const user = item ? JSON.parse(item) : null;
        const uid = user?.id || user?.cid;
        if (uid) {
          const data = await FoodieService.getAllFollowing(uid);
          setFollowings(data);
        }
      } catch (error) {
        console.error("Error fetching followings:", error);
      }
    })();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle case where followings is null or undefined
  const saferFollowings = followings || [];
  const totalPages = Math.ceil(saferFollowings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFollowings = saferFollowings.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleUnfollow = async (creatorId) => {
    try {
      await FoodieService.unFollowCreator(creatorId);
      // Remove the unfollowed creator from the list
      setFollowings((prev) =>
        prev.filter((item) => (item.cid || item.id) !== creatorId),
      );
    } catch (error) {
      console.error("Unfollow failed:", error);
      alert("Failed to unfollow. Please try again.");
    }
  };

  return saferFollowings.length > 0 ? (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="mb-4">
            <TableRow>
              <TableHead className="h-full text-center py-4 text-primary font-bold w-[60px]">
                ID
              </TableHead>
              <TableHead className="h-full text-center py-4 text-primary font-bold w-[80px]">
                Icon
              </TableHead>
              <TableHead className="h-full text-left py-4 text-primary font-bold w-[120px]">
                Name
              </TableHead>
              <TableHead className="h-full text-center py-4 text-primary font-bold w-[120px]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentFollowings.map((following) => {
              const id = following.cid || following.id;
              const name =
                following.username ||
                (following.firstName
                  ? `${following.firstName} ${following.lastName}`
                  : "Unknown");
              const icon = following.pic;

              return (
                <TableRow key={id}>
                  <TableCell className="h-full text-center font-medium">
                    {id}
                  </TableCell>
                  <TableCell className="h-full text-center">
                    <div className="flex justify-center items-center">
                      {icon ? (
                        <img
                          src={icon}
                          alt={name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <User className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="h-full text-left font-medium">
                    {name}
                  </TableCell>
                  <TableCell className="h-full text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUnfollow(id)}
                      className="w-full text-xs border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600">
                      Unfollow
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}>
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {Math.max(1, totalPages)}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages || totalPages === 0}>
          Next
        </Button>
      </div>
    </div>
  ) : (
    "No followings found."
  );
}
