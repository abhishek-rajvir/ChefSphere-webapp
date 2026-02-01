import React, { useState } from "react";
import { toast } from "react-hot-toast";
import AdminService from "@/service/AdminService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const [userId, setUserId] = useState("");
  const [updateUserId, setUpdateUserId] = useState("");
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    if (!userId) return toast.error("Please enter User ID");
    if (confirm("Are you sure you want to delete User " + userId + "?")) {
      toast.promise(
        AdminService.deleteUser(userId).then(() => {
          setUserId("");
        }),
        {
          loading: "Deleting user...",
          success: "User deleted successfully",
          error: (err) => err.message || "Failed to delete user",
        },
      );
    }
  };

  const handleUpdateUser = () => {
    if (!updateUserId) return toast.error("Please enter User ID to update");
    navigate(`/admin/users/${updateUserId}/edit`);
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Delete User</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="p-3 mb-4 text-sm text-yellow-800 bg-yellow-50 rounded-lg dark:bg-gray-800 dark:text-yellow-300"
            role="alert">
            <span className="font-medium">Warning!</span> This action will
            permanently remove the user from the database.
          </div>
          <Input
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Button
            variant="destructive"
            onClick={handleDeleteUser}
            className="w-full">
            Delete User
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Update User</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="User ID to Update"
            value={updateUserId}
            onChange={(e) => setUpdateUserId(e.target.value)}
          />
          <Button onClick={handleUpdateUser} className="w-full">
            Update User
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
