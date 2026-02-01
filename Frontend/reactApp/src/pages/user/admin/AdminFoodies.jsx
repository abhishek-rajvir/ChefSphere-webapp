import React, { useState } from "react";
import AdminService from "@/service/AdminService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";

export default function AdminFoodies() {
  const [foodieId, setFoodieId] = useState("");

  const handleDeleteFoodie = async () => {
    if (!foodieId) {
      toast.error("Please enter Foodie ID");
      return;
    }
    if (confirm("Are you sure you want to delete Foodie " + foodieId + "?")) {
      toast.promise(
        AdminService.deleteFoodie(foodieId).then(() => {
          setFoodieId(""); // Clear the input on successful deletion
        }),
        {
          loading: "Deleting foodie...",
          success: "Foodie deleted successfully",
          error: (err) =>
            `Failed to delete foodie: ${err.message || "Unknown error"}`,
        },
      );
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Delete Foodie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Foodie ID"
            value={foodieId}
            onChange={(e) => setFoodieId(e.target.value)}
          />
          <Button
            variant="destructive"
            onClick={handleDeleteFoodie}
            className="w-full">
            Delete Foodie
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
