// Menu items.
import {
  UsersRoundIcon,
  UserPenIcon,
  HomeIcon,
  ChefHat,
  InfoIcon,
} from "lucide-react";

const items = [
  {
    title: "Home",
    url: "/foodies/home",
    icon: HomeIcon,
  },
  {
    title: "Profile",
    url: "/foodies/profile",
    icon: UserPenIcon,
  },
  {
    title: "Following",
    url: "/foodies/following",
    icon: UsersRoundIcon,
  },
  {
    title: "Creators",
    url: "/foodies/creators",
    icon: ChefHat,
  },
  {
    title: "About us",
    url: "/about",
    icon: InfoIcon,
  },
];

export default items;
