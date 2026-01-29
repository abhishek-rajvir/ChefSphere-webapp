// Menu items.
import {
  UsersRoundIcon,
  UserPenIcon,
  HomeIcon,
  ChefHat,
  InfoIcon,
  Settings,
} from "lucide-react";

const items = [
  {
    title: "Home",
    url: "/foodie/home",
    icon: HomeIcon,
  },
  {
    title: "Profile",
    url: "/foodie/profile",
    icon: UserPenIcon,
  },
  {
    title: "Following",
    url: "/foodie/following",
    icon: UsersRoundIcon,
  },
  {
    title: "Creators",
    url: "/foodie/creators",
    icon: ChefHat,
  },
  {
    title: "Settings",
    url: "/foodie/settings",
    icon: Settings,
  },
  {
    title: "About us",
    url: "/foodie/about",
    icon: InfoIcon,
  },
];

export default items;
