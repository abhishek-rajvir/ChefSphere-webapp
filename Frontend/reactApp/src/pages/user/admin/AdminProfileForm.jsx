import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Pencil, User } from "lucide-react";
import { UploadAvatar, FetchAvatar } from "@/service/ImagekitApiService";
import UserService from "@/service/UserService";
import AdminService from "@/service/AdminService";

export default function AdminProfileForm({ initialData = {}, onSave }) {
  const { id: paramId } = useParams();
  const id = Number(paramId);
  const navigate = useNavigate();

  if (!id || isNaN(id) || id < 1) {
    toast.error("Invalid user ID");
    navigate("/admin");
    return;
  }

  const [formData, setFormData] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    username: initialData.username || "",
    email: initialData.email || "",
    id: initialData.id || "",

    gender: initialData.gender || "",
    avatarUrl: initialData.avatarUrl || "",
    description: initialData.description || "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!id) return;
      try {
        const data = await AdminService.getUserById(id);
        setUserType(data.type || "");

        if (data) {
          setFormData((prev) => ({
            ...prev,
            firstName: data.firstName || prev.firstName,
            lastName: data.lastName || prev.lastName,
            username: data.username || prev.username,
            email: data.email || prev.email,
            id: data.id || prev.id,
            gender: data.gender || prev.gender,
            avatarUrl: data.pic || prev.avatarUrl,
            description: data.description || prev.description,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
        toast.error(error.message || "Failed to fetch user details");
      }
    };
    fetchUserDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handlePencilClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      // Clear any previous avatar error
      setErrors((prev) => ({ ...prev, avatar: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    let finalAvatarUrl = formData.avatarUrl;

    // If a new image file was selected, upload it first
    if (selectedFile) {
      try {
        finalAvatarUrl = await UploadAvatar(
          selectedFile,
          formData.id || "temp",
        );
      } catch (error) {
        setErrors({ avatar: error.message || "Failed to upload avatar image" });
        setIsSubmitting(false);
        return;
      }
    }

    const finalFormData = {
      ...formData,
      pic: finalAvatarUrl,
    };

    try {
      if (onSave) {
        // If parent provided onSave (unlikely based on current usage, but for compatibility)
        onSave(finalFormData);
      }

      // Call service to update user details
      await AdminService.updateUser(id, finalFormData);
      console.log("Saved Profile:", finalFormData);
      toast.success("Profile updated successfully");
      navigate("/admin/users", { replace: true });
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error(error.message || "Failed to update profile");
      setErrors((prev) => ({ ...prev, api: "Failed to update profile" }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Display image: preview of selected file, or existing avatarUrl
  const displayImage = previewUrl || formData.avatarUrl;

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Update your personal information and profile settings.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-primary/20 bg-muted flex items-center justify-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Avatar Preview"
                    className="h-full w-full object-cover"
                  />
                ) : formData.id ? (
                  (
                    <FetchAvatar
                      userId={formData.id}
                      width={96}
                      height={96}
                      alt="Avatar"
                    />
                  ) || <User className="h-12 w-12 text-muted-foreground" />
                ) : (
                  <User className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-sm"
                onClick={handlePencilClick}>
                <Pencil className="h-4 w-4" />
              </Button>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
            {selectedFile && (
              <p className="text-sm text-muted-foreground">
                Selected: {selectedFile.name}
              </p>
            )}
            {errors.avatar && (
              <p className="text-sm text-red-500">{errors.avatar}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="johndoe"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              name="gender"
              className={cn(
                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              )}
              value={formData.gender}
              onChange={handleChange}>
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Bio</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Tell us about yourself"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {errors.api && (
            <p className="text-sm text-red-500 text-center">{errors.api}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
