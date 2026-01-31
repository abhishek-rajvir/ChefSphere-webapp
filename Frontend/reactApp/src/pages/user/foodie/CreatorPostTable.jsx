import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import FoodieService from "@/service/FoodieService";

import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../../utils/context/AuthContext";

export default function CreatorPostTable() {
  const params = useParams();
  const cid = Number(params.id);

  if (!cid || isNaN(cid) || cid < 1) {
    toast.error("Invalid creator ID");
    navigate(-1);
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const itemsPerPage = 5;
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const data = await FoodieService.getCreatorsPosts(cid);
        console.log(data);
        setPosts(data || []);
      } catch (err) {
        setPosts([]);
      }
    })();
  }, [cid]);

  const navigate = useNavigate();
  const location = useLocation();
  const isFoodie = location.pathname.includes("/foodie");

  const basePath = !isAuthenticated ? "/" : isFoodie ? "/foodie" : "/creator";
  const postPath = !isAuthenticated ? "post" : "posts";

  // Handle case where posts is null or undefined
  const safePosts = posts;
  const totalPages = Math.ceil(safePosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = safePosts.slice(startIndex, startIndex + itemsPerPage);

  return safePosts.length > 0 ? (
    <div className="space-y-4">
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="mb-4">
            <TableRow>
              <TableHead className="h-full text-center py-4 text-primary font-bold">
                pid
              </TableHead>
              <TableHead className="h-full text-center py-4 text-primary font-bold">
                Title
              </TableHead>
              <TableHead className="h-full text-center py-4 text-primary font-bold">
                Description
              </TableHead>
              <TableHead className="h-full text-center py-4 text-primary font-bold">
                Video
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPosts.map((post) => (
              <TableRow
                key={post.pid}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() =>
                  navigate(
                    `${basePath === "/" ? "" : basePath}/${postPath}/${post.pid}`,
                    { state: { post } },
                  )
                }>
                <TableCell className="h-full text-center">{post.pid}</TableCell>
                <TableCell className="h-full text-center max-w-[200px] break-words whitespace-normal">
                  {post.postTitle}
                </TableCell>
                <TableCell className="h-full text-center max-w-[300px] break-words whitespace-normal">
                  {post.description}
                </TableCell>
                <TableCell className="h-full text-center">
                  <div
                    dangerouslySetInnerHTML={{ __html: post.videoTag }}
                    className="flex justify-center items-center"
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
              </TableRow>
            ))}
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
    <h4 className="text-center">No posts found.</h4>
  );
}
