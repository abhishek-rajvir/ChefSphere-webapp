// Menu items.
import {
  UsersRoundIcon,
  ImageIcon,
  UserPenIcon,
  InfoIcon,
  Settings,
  HomeIcon,
  ChefHat,
  ForkKnife,
} from "lucide-react";

const items = [
  {
    title: "Profile",
    url: "/admin/profile",
    icon: UserPenIcon,
  },
  {
    title: "Home",
    url: "/admin/",
    icon: HomeIcon,
  },
  {
    title: "Posts",
    url: "/admin/posts",
    icon: ImageIcon,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: UsersRoundIcon,
  },
  {
    title: "Creators",
    url: "/admin/creators",
    icon: ChefHat,
  },
  {
    title: "Foodies",
    url: "/admin/foodies",
    icon: ForkKnife,
  },
  // {
  //   title: "Settings",
  //   url: "/admin/settings",
  //   icon: Settings,
  // },
  {
    title: "About us",
    url: "/admin/about",
    icon: InfoIcon,
  },
];

export default items;
