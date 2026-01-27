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
    url: "/creators/profile",
    icon: UserPenIcon,
  },
  {
    title: "Post",
    url: "/creators/posts",
    icon: ImageIcon,
  },
  {
    title: "Followers",
    url: "/creators/followers",
    icon: UsersRoundIcon,
  },
  {
    title: "Settings",
    url: "/creators/settings",
    icon: Settings,
  },
  {
    title: "About us",
    url: "/about",
    icon: InfoIcon,
  },
];

export default items;
