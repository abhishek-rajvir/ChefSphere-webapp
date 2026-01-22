import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

export default function NavBar({
  postPage = false,
  profilePage = false,
  followersPage = false,
  posts,
  followers,
  CreatorTable,
  unloadUser,
}) {

  const navLinkClass = ({ isActive }) =>
    cn(
      "px-3 py-2 text-sm font-medium transition-colors",
      isActive
        ? "text-primary border-b-2 border-primary"
        : "text-muted-foreground hover:text-primary"
    );

  return (
    <>
      <header className="border-b bg-background">
        <nav className="container flex h-14 items-center justify-center gap-6">
          <NavLink to="/creators/posts" className={navLinkClass}>
            Posts
          </NavLink>
          <NavLink to="/creators/profile" className={navLinkClass}>
            Profile
          </NavLink>
          <NavLink to="/creators/followers" className={navLinkClass}>
            Followers
          </NavLink>
        </nav>
      </header>

      {/* Page Content */}
      <main className="container mt-6">
        {postPage &&
          (posts ? (
            <CreatorTable posts={posts} />
          ) : (
            <h4 className="text-center text-muted-foreground">
              You have no posts
            </h4>
          ))}

        {followersPage &&
          (followers ? (
            <CreatorTable followers={followers} />
          ) : (
            <h4 className="text-center text-muted-foreground">
              You have no followers
            </h4>
          ))}
      </main>
    </>
  );
}
