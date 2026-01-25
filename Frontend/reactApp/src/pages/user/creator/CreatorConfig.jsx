// Menu items.
import {
  UsersRoundIcon,
  ImageIcon,
  UserPenIcon,
  Info,
  InfoIcon,
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
    title: "About us",
    url: "/about",
    icon: InfoIcon,
  },
];

export default items;
