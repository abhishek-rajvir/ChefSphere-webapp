import React, { useState } from "react";
import { toast } from "react-hot-toast";
import AdminService from "@/service/AdminService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function AdminPosts() {
  const [postId, setPostId] = useState("");
  const [editPostId, setEditPostId] = useState("");
  const navigate = useNavigate();

  const handleDeletePost = async () => {
    if (!postId) return toast.error("Please enter Post ID");
    if (confirm("Are you sure you want to delete Post " + postId + "?")) {
      try {
        await AdminService.deletePost(postId);
        toast.success("Post deleted successfully");
        setPostId("");
      } catch (err) {
        toast.error(err.message || "Failed to delete post");
      }
    }
  };

  const handleEditPost = () => {
    if (!editPostId) return toast.error("Please enter Post ID to edit");
    navigate(`/admin/posts/${editPostId}/edit`);
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Delete Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Post ID"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
          />
          <Button
            variant="destructive"
            onClick={handleDeletePost}
            className="w-full">
            Delete Post
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Post ID to Edit"
            value={editPostId}
            onChange={(e) => setEditPostId(e.target.value)}
          />
          <Button onClick={handleEditPost} className="w-full">
            Edit Post
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
