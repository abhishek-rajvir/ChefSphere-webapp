import React, { useState } from "react";
import AdminService from "@/service/AdminService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminCreators() {
  const [creatorId, setCreatorId] = useState("");

  const handleDeleteCreator = async () => {
    if (!creatorId) return alert("Please enter Creator ID");
    if (confirm("Are you sure you want to delete Creator " + creatorId + "?")) {
      try {
        await AdminService.deleteCreator(creatorId);
        alert("Creator deleted successfully");
        setCreatorId("");
      } catch (err) {
        alert(err.message);
      }
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
