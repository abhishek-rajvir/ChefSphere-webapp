// Menu items.
import {
  UsersRoundIcon,
  ImageIcon,
  UserPenIcon,
  InfoIcon,
  Settings,
} from "lucide-react";

const items = [
  {
    title: "Profile",
    url: "/admin/profile",
    icon: UserPenIcon,
  },
  {
    title: "Posts",
    url: "/admin/posts",
    icon: ImageIcon,
  },
  {
    title: "Creators",
    url: "/admin/creators",
    icon: ImageIcon,
  },
  {
    title: "Foodies",
    url: "/admin/foodies",
    icon: UsersRoundIcon,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
  {
    title: "About us",
    url: "/about",
    icon: InfoIcon,
  },
];

export default items;
