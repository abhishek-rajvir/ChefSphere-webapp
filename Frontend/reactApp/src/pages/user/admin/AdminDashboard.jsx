import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Foodies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Manage all foodie accounts.
            </p>
            <Button
              className="w-full"
              onClick={() => navigate("/admin/foodies")}>
              Manage Foodies
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Creators</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Manage all creator accounts.
            </p>
            <Button
              className="w-full"
              onClick={() => navigate("/admin/creators")}>
              Manage Creators
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Manage all posts.
            </p>
            <Button className="w-full" onClick={() => navigate("/admin/posts")}>
              Manage Posts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
