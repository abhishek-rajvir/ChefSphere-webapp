import { useEffect, useState } from "react";
import CreatorPostTable from "./CreatorPostTable";
import CreatorService from "@/service/CreatorService";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function CreatorPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await CreatorService.getCreatorsPosts();
        setPosts(data || []);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Creator Posts</h1>
        <Button onClick={() => navigate("/creator/posts/new")}>
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>
      {loading ? (
        <div className="text-center py-4">Loading posts...</div>
      ) : (
        <CreatorPostTable
          posts={posts}
          onPostDelete={(id) => setPosts(posts.filter((p) => p.pid !== id))}
        />
      )}
    </div>
  );
}
