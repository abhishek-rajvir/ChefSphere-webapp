import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Star,
  Clock,
  Folder,
  Utensils,
  StarHalf,
  Trash2,
  Send,
} from "lucide-react";
import { getYoutubeId } from "@/lib/utils";
import FoodieService from "@/service/FoodieService";
import Fraction from "fraction.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Utility to convert decimal to mixed fraction
const toFraction = (value) => {
  try {
    return new Fraction(value).toFraction(true);
  } catch {
    return value;
  }
};

// Component to render stars based on rating
const StarRating = ({ rating }) => {
  if (!rating || rating === 0) return null;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-current" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-current" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5" />
      ))}
      <span className="ml-2 font-bold">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function PostPage({ post: postId }) {
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Comments and Ratings State
  const [comments, setComments] = useState([]);
  const [postRating, setPostRating] = useState(null); // The average rating
  const [commentInput, setCommentInput] = useState("");
  const [userRating, setUserRating] = useState(0); // For user submission (not fully implemented yet per req)

  // Get current user from session
  const user = JSON.parse(sessionStorage.getItem("userCred") || "{}");
  const username = user.username || user.name;
  const userEmail = user.email; // Extract email for comparison

  useEffect(() => {
    if (!postId) return;

    (async () => {
      try {
        setLoading(true);
        // Fetch post details
        const data = await FoodieService.getPostsByNo(postId);
        setPostData(data);
        if (data.rating) {
          setPostRating(data.rating); // Expecting { rating: 4.0 } or 4.0
        }

        // Fetch comments
        try {
          const commentList = await FoodieService.getCommentsByPostId(postId);
          setComments(commentList || []);
        } catch (e) {
          console.warn("Failed to fetch comments", e);
          setComments([]);
        }
      } catch (err) {
        console.error("Error fetching post details:", err);
        setError("Failed to load recipe details.");
      } finally {
        setLoading(false);
      }
    })();
  }, [postId]);

  if (loading) {
    return (
      <div className="p-8 text-center text-lg font-medium">
        Loading deliciousness...
      </div>
    );
  }

  if (error || !postData) {
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        {error || "Recipe not found"}
      </div>
    );
  }

  // Deduplicate and process data
  const {
    postTitle,
    description,
    videoURL,
    recipe_Details,
    list_Of_Ingredients,
    list_of_Steps,
    list_of_categorys,
    rating,
  } = postData;

  // Rating check
  const displayRating = rating && rating.rating > 0 ? rating.rating : 0;

  // Deduplicate steps by step_no
  const uniqueSteps = list_of_Steps
    ? Array.from(
        new Map(list_of_Steps.map((step) => [step.step_no, step])).values(),
      ).sort((a, b) => a.step_no - b.step_no)
    : [];

  // Deduplicate ingredients by name
  const uniqueIngredients = list_Of_Ingredients
    ? Array.from(
        new Map(
          list_Of_Ingredients.map((ing) => [
            ing.name.toLowerCase().trim(),
            ing,
          ]),
        ).values(),
      )
    : [];

  const videoId = getYoutubeId(videoURL || postData.videoUrl);
  const videoEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // Handlers
  const handleAddComment = async () => {
    if (!commentInput.trim()) return;

    // Check if user already commented
    if (comments.some((c) => c.username === username)) {
      toast.error("You can only post one comment per recipe.");
      return;
    }

    try {
      const commentData = {
        message: commentInput,
        postId: postId,
      };

      await FoodieService.createComment(commentData);

      // Refresh comments
      const newComments = await FoodieService.getCommentsByPostId(postId);
      setComments(newComments || []);
      setCommentInput("");
    } catch (e) {
      console.error("Failed to add comment", e);
      toast.error("Failed to post comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await FoodieService.deleteComment(commentId);
        // Refresh comments
        setComments((prev) =>
          prev.filter((c) => c.id !== commentId && c.commentId !== commentId),
        );
      } catch (e) {
        console.error("Failed to delete comment", e);
        toast.error("Failed to delete comment");
      }
    }
  };

  const handleRatePost = async (newRating) => {
    if (user?.type?.toUpperCase() === "CREATOR") {
      toast.error("Creators cannot rate recipes.");
      return;
    }

    try {
      const ratingData = {
        postId: postId,
        rating: newRating,
      };
      await FoodieService.addRating(ratingData);
      setUserRating(newRating);

      // Refresh overall rating
      const updatedRating = await FoodieService.getRatingByPostId(postId);
      setPostRating(updatedRating);
    } catch (e) {
      console.error("Failed to submit rating", e);
      toast.error("Failed to  submit rating");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-12 bg-background text-foreground animate-in fade-in duration-500">
      {/* SECTION 1: Header */}
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 ring-1 ring-black/5">
          <img
            src={thumbnail}
            alt={postTitle}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
          />
        </div>

        <div className="space-y-4 px-4 w-full">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary">
            {postTitle || recipe_Details?.recipeName}
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            {description || recipe_Details?.description}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm md:text-base font-semibold py-4 border-y border-border/50 w-full max-w-3xl mx-auto">
            {recipe_Details?.prepTime && (
              <div className="flex items-center gap-2 text-blue-500">
                <Clock className="w-5 h-5" />
                <span>{recipe_Details.prepTime} mins</span>
              </div>
            )}

            {list_of_categorys && list_of_categorys.length > 0 && (
              <div className="flex items-center gap-2 text-green-500">
                <Folder className="w-5 h-5" />
                <span>{list_of_categorys.map((c) => c.name).join(", ")}</span>
              </div>
            )}

            {recipe_Details?.number_of_servings && (
              <div className="flex items-center gap-2 text-orange-500">
                <Utensils className="w-5 h-5" />
                <span>{recipe_Details.number_of_servings} Servings</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-200" />

      {/* SECTION 2: Instructions */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold flex items-center gap-2 px-2">
          <Clock className="w-6 h-6 text-primary" />
          Instructions
        </h2>
        <div className="space-y-6">
          {uniqueSteps.map((inst, index) => (
            <div
              key={`${inst.step_no}-${index}`}
              className="group flex flex-col gap-3 p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md text-left">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors text-left">
                  Step {inst.step_no}: {inst.step_name}
                </h3>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed text-left">
                {inst.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-gray-200" />

      {/* SECTION 3: Ingredients */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 px-2">
          <Utensils className="w-6 h-6 text-primary" />
          Ingredients
        </h2>
        <div className="mx-auto w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="px-6 py-3 font-bold text-base min-w-[150px] text-left">
                  Ingredient
                </TableHead>
                <TableHead className="px-6 py-3 font-bold text-base min-w-[200px] text-left">
                  Details
                </TableHead>
                <TableHead className="px-6 py-3 font-bold text-base text-center w-[80px]">
                  Qty
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uniqueIngredients.map((ing, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-muted/30 transition-colors">
                  <TableCell className="px-6 py-3 font-semibold text-left">
                    {ing.name}
                  </TableCell>
                  <TableCell className="px-6 py-3 text-muted-foreground italic text-left">
                    {ing.description || "-"}
                  </TableCell>
                  <TableCell className="px-6 py-3 font-bold text-center text-primary whitespace-nowrap">
                    {toFraction(ing.qty)} {ing.unit ? `(${ing.unit})` : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <hr className="border-t border-gray-200" />

      {/* SECTION 4: Video */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold px-2">Video Tutorial</h2>
        <div className="aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black ring-4 ring-white dark:ring-gray-800">
          <iframe
            width="100%"
            height="100%"
            src={videoEmbedUrl}
            title={postTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"></iframe>
        </div>
      </section>

      <hr className="border-t border-gray-200" />

      {/* SECTION 4.2: Creator Card */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold px-2">Created By</h2>
        <div
          onClick={() => {
            if (user?.type?.toUpperCase() === "CREATOR") {
              navigate("/creator/posts");
            } else {
              navigate(`/foodie/creators/${postData.cid || 0}`);
            }
          }}
          className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
            <img
              src={`https://dummyjson.com/image/150x150/dcfce7/000000?text=${encodeURIComponent((postData.creatorName || "C").charAt(0).toUpperCase())}&fontSize=40`}
              alt={postData.creatorName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold">
              {postData.creatorName || "Unknown Creator"}
            </h3>
            <p className="text-muted-foreground">
              Professional Chef & Content Creator
            </p>
          </div>
        </div>
      </section>

      <hr className="border-t border-gray-200" />

      {/* SECTION 4.5: Ratings */}
      <section className="space-y-6 text-center">
        <h2 className="text-2xl font-bold px-2">Rate this Recipe</h2>
        <div className="flex flex-col items-center gap-4">
          {/* Show fetched rating if available, otherwise show rating from post data */}
          {/* Handle both object {rating: 4.0} and number 4.0 formats */}
          {(() => {
            const r = postRating?.rating ?? postRating;
            const d = displayRating;
            const finalRating = r > 0 ? r : d;

            return finalRating > 0 ? (
              <div className="scale-125">
                <StarRating rating={finalRating} />
              </div>
            ) : null;
          })()}

          {user?.type?.toUpperCase() !== "CREATOR" ? (
            <>
              {/* Rating Interaction */}
              <div
                className="flex items-center gap-2 cursor-pointer p-4 rounded-full bg-muted/30 hover:bg-muted/50 transition-colors"
                title="Click to rate">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-8 h-8 transition-transform hover:scale-110 ${
                      userRating >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground hover:text-yellow-400"
                    }`}
                    onClick={() => handleRatePost(star)}
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                Click a star to submit your rating
              </p>
            </>
          ) : (
            <p className="text-muted-foreground italic">
              Creators cannot rate recipes.
            </p>
          )}
        </div>
      </section>

      <hr className="border-t border-gray-200" />

      {/* SECTION 5: Comments & Ratings */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold px-2">Discuss</h2>
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-8">
          {/* Add Comment */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Leave a comment</h3>
            <div className="flex gap-4">
              <Input
                placeholder="Share your thoughts..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1"
                disabled={comments.some(
                  (c) =>
                    c.authorName === username || c.authorName === userEmail,
                )}
              />
              <Button
                onClick={handleAddComment}
                disabled={
                  !commentInput.trim() ||
                  comments.some(
                    (c) =>
                      c.authorName === username || c.authorName === userEmail,
                  )
                }>
                <Send className="w-4 h-4 mr-2" /> Post
              </Button>
            </div>
            {comments.some(
              (c) => c.authorName === username || c.authorName === userEmail,
            ) && (
              <p className="text-xs text-muted-foreground">
                You have already posted a comment.
              </p>
            )}
          </div>

          <div className="h-px bg-border my-6" />

          {/* Comments List */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              Comments{" "}
              <span className="text-sm font-normal text-muted-foreground">
                ({comments.length})
              </span>
            </h3>
            {comments.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              <div className="space-y-4">
                {comments.map((comment, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-4 rounded-xl bg-muted/30">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">
                          {/* Display name: strip email domain if it looks like an email for cleaner UI, or show full */}
                          {comment.authorName ||
                            comment.foodieName ||
                            comment.username}
                        </span>
                        {/* Check permissions: match username OR email */}
                        {((comment.authorName &&
                          (comment.authorName === username ||
                            comment.authorName === userEmail)) ||
                          (comment.foodieName &&
                            (comment.foodieName === username ||
                              comment.foodieName === userEmail)) ||
                          (comment.username &&
                            (comment.username === username ||
                              comment.username === userEmail)) ||
                          postData.creatorName === username ||
                          postData.creatorName === userEmail) && (
                          <button
                            onClick={() =>
                              handleDeleteComment(
                                comment.id || comment.commentId,
                              )
                            }
                            className="text-red-500 hover:bg-red-100 p-1.5 rounded-full transition-colors"
                            title="Delete comment">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-foreground/90 text-left">
                        {comment.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
