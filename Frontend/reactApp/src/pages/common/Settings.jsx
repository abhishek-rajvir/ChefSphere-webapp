import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Trash2 } from "lucide-react";
import UserService from "@/service/UserService";
import FoodieService from "@/service/FoodieService";
import CreatorService from "@/service/CreatorService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/context/AuthContext";

export default function Settings() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      if (!isAuthenticated) return;

      try {
        if (user.type === "CREATOR") {
          await CreatorService.deleteCreator();
        } else {
          // foodie
          await FoodieService.deleteFoodie();
        }
        toast.success("Account deleted successfully.");
        logout();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete account.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Delete Account Section */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Delete Account</CardTitle>
          <CardDescription>
            Permanently remove your account and all associated data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 mt-0.5" />
            <div>
              <h4 className="font-semibold">Warning</h4>
              <p className="text-sm mt-1">
                This action is irreversible. All your posts, followers, and
                profile data will be permanently deleted.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
