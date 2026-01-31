import "./App.css";

import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "./utils/context/AuthContext.jsx";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/auth/ProtectedRoute.jsx";

import LoginForm from "./pages/Auth/LoginForm.jsx";
import RegisterForm from "./pages/Auth/RegisterForm.jsx";
import ForgotPasswordForm from "./pages/Auth/ForgotPasswordForm.jsx";

import NotFoundPage from "./pages/error/NotFoundPage.jsx";
import AdminUi from "./UI/AdminUi";
import AboutUs from "./pages/common/AboutPage.jsx";
import CreatorUi from "./UI/CreatorUi";
import FoodieUi from "./UI/FoodieUi";
import GuestUi from "./UI/GuestUi";

import FoodieDashBoard from "./pages/user/foodie/FoodieDashBoard";
import FoodieAllPosts from "./pages/user/foodie/FoodieAllPosts";
import FoodieViewPost from "./pages/user/foodie/FoodieViewPost";
import FoodieAllCreators from "./pages/user/foodie/FoodieAllCreators";
import FoodieViewCreator from "./pages/user/foodie/FoodieViewCreator";
import FollowingTable from "./pages/user/foodie/FollowingTable";
import CreatorPosts from "./pages/user/creator/post/CreatorPosts";
import CreatorViewPost from "./pages/user/creator/post/CreatorViewPost";
import FollowerTable from "./pages/user/creator/FollowerTable";
import FoodieAllCategories from "./pages/user/foodie/FoodieAllCategories";
import NewPostForm from "./pages/user/creator/post/NewPostForm";

import SearchPage from "./pages/common/SearchPage.jsx";
import Settings from "./pages/common/Settings";
import ProfileForm from "./pages/common/ProfileForm.jsx";

import GuestDashBoard from "./pages/user/guest/GuestDashBoard";
import GuestAllCategories from "./pages/user/guest/GuestAllCategories";
import GuestAllCreators from "./pages/user/guest/GuestAllCreators";
import GuestViewCreator from "./pages/user/guest/GuestViewCreator";
import GuestAllPosts from "./pages/user/guest/GuestAllPosts";
import GuestViewPost from "./pages/user/guest/GuestViewPost.jsx";
import UpdatePostForm from "./pages/user/creator/post/UpdatePostForm";

import AdminDashboard from "./pages/user/admin/AdminDashboard";
import AdminPosts from "./pages/user/admin/AdminPosts";
import AdminCreators from "./pages/user/admin/AdminCreators";
import AdminFoodies from "./pages/user/admin/AdminFoodies";
import AdminUsers from "./pages/user/admin/AdminUsers";
import AdminProfileForm from "./pages/user/admin/AdminProfileForm";
import AdminUpdatePostForm from "./pages/user/admin/AdminUpdatePostForm.jsx";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AuthProvider>
          <Routes>
            {/* Public routes */}

            {/* Auth Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgot" element={<ForgotPasswordForm />} />

            {/* Guest Routes */}
            <Route path="/" element={<GuestUi />}>
              {/* Guest Default Routes */}
              <Route index element={<GuestDashBoard />} />
              <Route path="home" element={<GuestDashBoard />} />
              <Route path="dashboard" element={<GuestDashBoard />} />

              {/* Guest Posts Routes */}
              <Route path="posts" element={<GuestAllPosts />} />
              <Route path="post/:id" element={<GuestViewPost />} />

              {/* Guest Categories Routes */}
              <Route path="categories" element={<GuestAllCategories />} />

              {/* Guest Creators Routes */}
              <Route path="creators" element={<GuestAllCreators />} />
              <Route path="creators/:id" element={<GuestViewCreator />} />
              <Route path="search" element={<SearchPage />} />

              {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
              <Route path="about" element={<AboutUs />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Protected routes */}

            {/* Creator ROUTES */}
            <Route
              path="/creator"
              element={
                <ProtectedRoute role="CREATOR">
                  <CreatorUi />
                </ProtectedRoute>
              }>
              {/* DEFAULT DASHBOARD */}
              <Route index element={<CreatorPosts />} />

              {/* Creator Profile */}
              <Route path="profile" element={<ProfileForm />} />
              {/* Creator POSTS */}
              <Route path="posts" element={<CreatorPosts />} />
              <Route path="posts/new" element={<NewPostForm />} />
              <Route path="posts/:id" element={<CreatorViewPost />} />
              <Route path="posts/:id/edit" element={<UpdatePostForm />} />

              {/* Creator Followers */}
              <Route path="followers" element={<FollowerTable />} />

              {/* Creator SETTINGS */}
              <Route path="settings" element={<Settings />} />

              {/* Creator About */}
              <Route path="about" element={<AboutUs />} />

              {/* Creator 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Foodie ROUTES */}
            <Route
              path="/foodie"
              element={
                <ProtectedRoute role="FOODIE">
                  <FoodieUi />
                </ProtectedRoute>
              }>
              {/* DEFAULT DASHBOARD */}
              <Route index element={<FoodieDashBoard />} />
              <Route path="home" element={<FoodieDashBoard />} />

              {/* Creator Profile */}
              <Route path="profile" element={<ProfileForm />} />

              {/* Foodie POSTS */}
              <Route path="posts" element={<FoodieAllPosts />} />
              <Route path="posts/:id" element={<FoodieViewPost />} />

              {/* Foodie CREATORS */}
              <Route path="creators" element={<FoodieAllCreators />} />
              <Route path="creators/:id" element={<FoodieViewCreator />} />

              {/* Foodie Following */}
              <Route path="following" element={<FollowingTable />} />

              {/* Foodie Search */}
              <Route path="search" element={<SearchPage />} />

              {/* Foodie Categories */}
              <Route path="categories" element={<FoodieAllCategories />} />

              {/* Foodie SETTINGS */}
              <Route path="settings" element={<Settings />} />

              {/* Foodie About */}
              <Route path="about" element={<AboutUs />} />

              {/* Foodie 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* ADMIN ROUTES */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="ADMIN">
                  <AdminUi />
                </ProtectedRoute>
              }>
              {/* DEFAULT DASHBOARD */}
              <Route index element={<AdminDashboard />} />

              {/* Admin PROFILE */}
              <Route path="profile" element={<ProfileForm />} />

              {/* Admin POSTS */}
              <Route path="posts" element={<AdminPosts />} />
              <Route path="posts/:id/edit" element={<AdminUpdatePostForm />} />

              {/* Admin USERS */}
              <Route path="users" element={<AdminUsers />} />
              <Route path="users/:id/edit" element={<AdminProfileForm />} />
              {/* Admin CREATORS */}
              <Route path="creators" element={<AdminCreators />} />

              {/* Admin FOODIES */}
              <Route path="foodies" element={<AdminFoodies />} />

              {/* Admin About */}
              <Route path="about" element={<AboutUs />} />

              {/* Admin 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
