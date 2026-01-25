import React, { useState } from "react";
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

export function FollowerTable({ followers }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle case where followers is null or undefined
  // Handle case where followers is null or undefined or not an array
  const saferFollowers = Array.isArray(followers) ? followers : [];
  const totalPages = Math.ceil(saferFollowers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFollowers = saferFollowers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return saferFollowers.length > 0 ? (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="mb-4">
            <TableRow>
              <TableHead className="h-full text-center py-4 text-primary font-bold w-[100px]">
                ID
              </TableHead>
              <TableHead className="h-full text-center py-4 text-primary font-bold w-[100px]">
                Icon
              </TableHead>
              <TableHead className="h-full text-left py-4 text-primary font-bold">
                Name
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentFollowers.map((follower) => (
              <FollowerRow
                key={follower.fid || follower.id}
                follower={follower}
              />
            ))}
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
    <h4 className="text-center">No followers found.</h4>
  );
}

function FollowerRow({ follower }) {
  const displayName =
    `${follower.firstName} ${follower.lastName}`.trim() ||
    follower.username ||
    follower.name;
  const displayId = follower.fid || follower.id;

  return (
    <TableRow>
      <TableCell className="h-full text-center font-medium">
        {displayId}
      </TableCell>
      <TableCell className="h-full text-center">
        <div className="flex justify-center items-center">
          {follower.icon ? (
            <img
              src={follower.icon}
              alt={displayName}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <User className="h-6 w-6" />
            </div>
          )}
        </div>
      </TableCell>
      <TableCell className="h-full text-left">{displayName}</TableCell>
    </TableRow>
  );
}
