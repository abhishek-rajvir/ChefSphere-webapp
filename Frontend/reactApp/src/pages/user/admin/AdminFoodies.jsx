import React, { useState } from "react";
import AdminService from "@/service/AdminService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminFoodies() {
  const [foodieId, setFoodieId] = useState("");

  const handleDeleteFoodie = async () => {
    if (!foodieId) return alert("Please enter Foodie ID");
    if (confirm("Are you sure you want to delete Foodie " + foodieId + "?")) {
      try {
        await AdminService.deleteFoodie(foodieId);
        alert("Foodie deleted successfully");
        setFoodieId("");
      } catch (err) {
        alert(err.message);
      }
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
