import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import CreatorService from "../../../../service/CreatorService";
import { requestLog } from "../../../../jwt/axios_helper";
import { useNavigate } from "react-router-dom";

export default function CreatorPostTable({
  cid,
  posts: propPosts,
  onPostDelete,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const itemsPerPage = 5;

  const posts = propPosts || fetchedPosts;

  useEffect(() => {
    if (propPosts) return;
    (async () => {
      try {
        requestLog("Fetched creator posts for creatorId: " + cid);
        const data = await CreatorService.getCreatorsPosts();
        console.log(data);
        setFetchedPosts(data || []);
      } catch (err) {
        setFetchedPosts([]);
      }
    })();
  }, [cid, propPosts]);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await CreatorService.deletePost(id);
      requestLog("Deleted post with ID: " + id);

      if (propPosts && onPostDelete) {
        onPostDelete(id);
      } else {
        const updatedPosts = fetchedPosts.filter((post) => post.pid !== id);
        setFetchedPosts(updatedPosts);
      }
      toast.success("Post deleted successfully");
    } catch (err) {
      console.error("Failed to delete post:", err);
      toast.error("Failed to delete post");
    }
  };
  // Handle case where posts is null or undefined
  const safePosts = posts;
  const totalPages = Math.ceil(safePosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = safePosts.slice(startIndex, startIndex + itemsPerPage);

  return safePosts.length > 0 ? (
    <div className="space-y-4">
      <div className="rounded-md border overflow-hidden">
        <Table>
          {/* <TableCaption>A list of your posts.</TableCaption> */}
          <TableHeader className="mb-4">
            <TableRow>
              <TableHead className="h-full text-center py-4 text-primary font-bold">
                ID
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
              <TableHead className="h-full text-center py-4 text-primary font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPosts.map((post) => (
              <TableRow
                key={post.pid}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => navigate(`/creator/posts/${post.pid}`)}>
                <TableCell className="h-full text-center">{post.pid}</TableCell>
                <TableCell className="h-full text-center max-w-[200px] break-words whitespace-normal">
                  {post.post_title}
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
                <TableCell className="h-full text-center">
                  <div
                    className="flex justify-center items-center gap-2"
                    onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        navigate(`/creator/posts/${post.pid}/edit`);
                      }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(post.pid)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
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
    <h4 className="text-center">No posts found.</h4>
  );
}
