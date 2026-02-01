import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import CreatorService from "@/service/CreatorService";
import { FetchAvatar } from "@/service/ImagekitApiService";
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
import { Skeleton } from "@/components/ui/skeleton";

export default function FollowerTable() {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await CreatorService.getAllFollowers();
        setFollowers(data);
      } catch (error) {
        console.error("Error fetching followers:", error);
        toast.error("Failed to fetch followers. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const saferFollowers = followers || [];
  const totalPages = Math.ceil(saferFollowers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFollowers = saferFollowers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  if (loading) {
    return (
      <div className="space-y-4 max-w-lg mx-auto">
        <p className="text-muted-foreground animate-pulse font-medium text-center">
          Loading followers...
        </p>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell className="h-full text-center">
                    <Skeleton className="h-4 w-8 mx-auto" />
                  </TableCell>
                  <TableCell className="h-full text-center">
                    <div className="flex justify-center items-center">
                      <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                  </TableCell>
                  <TableCell className="h-full text-left">
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return saferFollowers.length > 0 ? (
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentFollowers.map((follower) => {
              const id = follower.fid;
              const name =
                follower.username ||
                (follower.firstName
                  ? `${follower.firstName} ${follower.lastName}`
                  : "Unknown");
              const icon = follower.pic;

              return (
                <TableRow key={id}>
                  <TableCell className="h-full text-center font-medium">
                    {id}
                  </TableCell>
                  <TableCell className="h-full text-center">
                    <div className="flex justify-center items-center">
                      {follower.userId ? (
                        <FetchAvatar
                          userId={follower.userId}
                          size={40}
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

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
    "No followers found."
  );
}
