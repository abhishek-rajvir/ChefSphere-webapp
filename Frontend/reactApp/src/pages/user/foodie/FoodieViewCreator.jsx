import { useEffect, useState } from "react";
import FoodieService from "@/service/FoodieService";
import { FetchAvatar } from "@/service/ImagekitApiService";
import CreatorPostTable from "./CreatorPostTable";
import { Star, Mail, User, Loader2 } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../utils/context/AuthContext";

export default function FoodieViewCreator() {
  const navigate = useNavigate();
  const params = useParams();
  const cid = Number(params.id);

  useEffect(() => {
    if (!cid || isNaN(cid) || cid <= 0) {
      toast.error("Invalid creator ID");
      console.log(cid);
      navigate("/foodie/", { replace: true });
      return;
    }
  }, [cid, navigate]);

  const [totalFollowers, setTotalFollowers] = useState(0);
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const { user } = useAuth(); // for checking if user follows this creator

  useEffect(() => {
    const fetchCreatorDetails = async () => {
      // Allow cid to be 0
      if (cid === undefined || cid === null) return;
      setLoading(true);
      try {
        let data;
        try {
          // If cid is 0, skip direct
          data = await FoodieService.getCreatorById(cid);
        } catch (e) {
          console.warn("Direct creator fetch failed, trying fallback...", e);
          const creators = await FoodieService.getCreatorsByRange(200);
          data = creators.find((c) => c.cid == cid);
          if (!data) throw new Error("Creator not found in fallback range");
        }
        setCreator(data);

        // Fetch total followers
        try {
          const count = await FoodieService.getTotalFollowers(cid);
          setTotalFollowers(count);
        } catch (e) {
          console.warn("Failed to fetch total followers", e);
        }

        // Check if current user is following this creator
        if (user?.id) {
          try {
            const isF = await FoodieService.doesFollowCreator(cid);
            // console.log("DEBUG: doesFollowCreator result:", isF);
            setIsFollowing(isF);
          } catch (e) {
            console.warn("Failed to check follow status", e);
          }
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching creator details:", err);
        setError("Failed to load creator details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCreatorDetails();
  }, [cid, user?.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !creator) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        {error || "Creator not found."}
      </div>
    );
  }

  const name = creator.username || "Creator";
  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-center gap-6 p-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-primary/20">
            <FetchAvatar
              userId={creator.uid}
              size={130}
              alt={name}
              className="w-full h-full object-cover"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h1 className="text-2xl font-bold">{name}</h1>
            <button
              onClick={async () => {
                try {
                  if (isFollowing) {
                    await FoodieService.unFollowCreator(cid);
                    setIsFollowing(false);
                    setTotalFollowers((prev) => Math.max(0, prev - 1));
                    toast.success("Unfollowed");
                  } else {
                    await FoodieService.followCreator(cid);
                    setIsFollowing(true);
                    setTotalFollowers((prev) => prev + 1);
                    toast.success("Followed");
                  }
                } catch (error) {
                  console.error("Follow action failed:", error);
                  toast.error("Failed to update follow status");
                }
              }}
              className={`text-sm px-4 py-1.5 rounded-full transition-colors font-medium ${
                isFollowing
                  ? "bg-black text-white dark:bg-white dark:text-black border border-primary"
                  : "text-primary border border-primary hover:bg-primary hover:text-white"
              }`}>
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>{" "}
          <p className="text-muted-foreground">
            {creator.description || "No description available."}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm pt-2">
            {creator.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>
                  {creator.rating}/5 ({creator.reviews || 0} reviews)
                </span>
              </div>
            )}
            <div className="flex items-center gap-1 text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{totalFollowers || 0} Followers</span>
            </div>
            {creator.email && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{creator.email}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recipes</h2>
        <CreatorPostTable cid={cid} />
      </div>
    </div>
  );
}
