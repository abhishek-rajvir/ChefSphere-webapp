import React, { useEffect, useState } from "react";
import FoodieService from "@/service/FoodieService";
import CreatorPostTable from "./CreatorPostTable";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Mail, MapPin, User, Loader2 } from "lucide-react";

export default function CreatorPage({ cid }) {
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreatorDetails = async () => {
      setLoading(true);
      try {
        let data;
        try {
          data = await FoodieService.getCreatorById(cid);
        } catch (e) {
          console.warn("Direct creator fetch failed, trying fallback...", e);
          const creators = await FoodieService.getCreatorsByRange(200);
          data = creators.find((c) => (c.cid || c.id) == cid);
          if (!data) throw new Error("Creator not found in fallback range");
        }
        setCreator(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching creator details:", err);
        setError("Failed to load creator details.");
      } finally {
        setLoading(false);
      }
    };

    if (cid) {
      fetchCreatorDetails();
    }
  }, [cid]);

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

  const name =
    creator.username ||
    (creator.firstName
      ? `${creator.firstName} ${creator.lastName}`
      : "Creator");
  const imageUrl =
    creator.pic ||
    `https://dummyjson.com/image/150x150/dcfce7/000000?text=${encodeURIComponent(name.charAt(0).toUpperCase())}&fontSize=40`;

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-center gap-6 p-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-primary/20">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-muted-foreground">
            {creator.bio || creator.description || "No description available."}
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
              <span>{creator.followersCount || 0} Followers</span>
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
