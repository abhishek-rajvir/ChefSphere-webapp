import React, { useState } from "react";
import AdminService from "@/service/AdminService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";

export default function AdminCreators() {
  // Assuming onDelete is not a required prop based on the original component structure and the instruction's focus on the function body replacement.
  const [creatorId, setCreatorId] = useState("");

  const handleDeleteCreator = async () => {
    if (!creatorId) return toast.error("Please enter Creator ID"); // Changed alert to toast.error
    if (confirm("Are you sure you want to delete Creator " + creatorId + "?")) {
      toast.promise(
        AdminService.deleteCreator(creatorId).then(() => {
          setCreatorId(""); // Replaced onDelete() with setCreatorId("") to match original component's state management
        }),
        {
          loading: "Deleting creator...",
          success: "Creator deleted successfully",
          error: (err) => err.message || "Failed to delete creator", // Improved error message handling
        },
      );
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Delete Creator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Creator ID"
            value={creatorId}
            onChange={(e) => setCreatorId(e.target.value)}
          />
          <Button
            variant="destructive"
            onClick={handleDeleteCreator}
            className="w-full">
            Delete Creator
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
