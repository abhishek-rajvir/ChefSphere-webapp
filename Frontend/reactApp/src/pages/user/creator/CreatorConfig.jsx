// Menu items.
import {
  UsersRoundIcon,
  ImageIcon,
  UserPenIcon,
  Info,
  InfoIcon,
  Settings,
} from "lucide-react";

const items = [
  {
    title: "Profile",
    url: "/creator/profile",
    icon: UserPenIcon,
  },
  {
    title: "Post",
    url: "/creator/posts",
    icon: ImageIcon,
  },
  {
    title: "Followers",
    url: "/creator/followers",
    icon: UsersRoundIcon,
  },
  {
    title: "Settings",
    url: "/creator/settings",
    icon: Settings,
  },
  {
    title: "About us",
    url: "/creator/about",
    icon: InfoIcon,
  },
];

export default items;
