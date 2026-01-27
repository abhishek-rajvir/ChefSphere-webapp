import "./App.css";

import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "./utils/context/AuthContext.jsx";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/auth/ProtectedRoute.jsx";
import NotFoundPage from "./pages/error/NotFoundPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import AdminUi from "./UI/AdminUi";
import AboutUs from "./pages/AboutPage.jsx";
import CreatorUi from "./UI/CreatorUi";
import FoodieUi from "./UI/FoodieUi";
import GuestUi from "./UI/GuestUi";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AuthProvider>
          <Routes>
            {/* Public routes */}

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Guest Routes */}
            <Route path="/" element={<GuestUi homePage={true} />} />
            <Route path="/home" element={<GuestUi homePage={true} />} />
            <Route path="/dashboard" element={<GuestUi homePage={true} />} />
            
            <Route path="/posts" element={<GuestUi postPage={true} />} />
            <Route path="/post/:id" element={<GuestUi viewPost={true} />} />
            
            <Route path="/creators" element={<GuestUi creatorsPage={true} />} />
            <Route
              path="/creators/:id"
              element={<GuestUi creatorDetailsPage={true} />}
            />
            <Route path="/search" element={<GuestUi searchPage={true} />} />

            {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="*" element={<NotFoundPage />} />

            {/* Protected routes */}

            {/* Creator ROUTES */}
            <Route
              path="/creator"
              element={
                <ProtectedRoute role="CREATOR">
                  <CreatorUi postPage={true} />
                </ProtectedRoute>
              }>
              {/* DEFAULT DASHBOARD */}
              <Route index element={<CreatorUi postPage={true} />} />

              {/* Creator Profile */}
              <Route
                path="profile"
                element={<CreatorUi profilePage={true} />}
              />
              {/* Creator POSTS */}
              <Route path="posts" element={<CreatorUi postPage={true} />} />
              <Route path="posts/new" element={<CreatorUi newPost={true} />} />
              <Route path="posts/:id" element={<CreatorUi viewPost={true} />} />
              <Route
                path="posts/:id/edit"
                element={<CreatorUi updatePost={true} />}
              />

              {/* Creator Followers */}
              <Route
                path="followers"
                element={<CreatorUi followersPage={true} />}
              />

              {/* Creator SETTINGS */}
              <Route
                path="settings"
                element={<CreatorUi settingsPage={true} />}
              />

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
                  <FoodieUi homePage={true} />
                </ProtectedRoute>
              }>
              {/* Creator Profile */}
              <Route
                path="profile"
                element={<CreatorUi profilePage={true} />}
              />
              {/* DEFAULT DASHBOARD */}
              <Route index element={<FoodieUi homePage={true} />} />

              {/* Foodie POSTS */}
              <Route path="posts" element={<FoodieUi postsPage={true} />} />
              <Route path="posts/:id" element={<FoodieUi viewPost={true} />} />

              {/* Foodie CREATORS */}
              <Route
                path="creators"
                element={<FoodieUi creatorsPage={true} />}
              />
              <Route
                path="creators/:id"
                element={<FoodieUi creatorDetailsPage={true} />}
              />

              {/* Foodie Following */}
              <Route
                path="following"
                element={<FoodieUi followingPage={true} />}
              />

              {/* Foodie Search */}
              <Route path="search" element={<FoodieUi searchPage={true} />} />

              {/* Foodie SETTINGS */}
              <Route
                path="settings"
                element={<FoodieUi settingsPage={true} />}
              />

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
                  <AdminUi postsPage={true} />
                </ProtectedRoute>
              }>
              {/* DEFAULT DASHBOARD */}
              <Route index element={<AdminUi postsPage={true} />} />

              {/* Admin POSTS */}
              <Route path="posts" element={<AdminUi postsPage={true} />} />
              <Route path="posts/:id" element={<AdminUi viewPost={true} />} />
              <Route
                path="posts/:id/edit"
                element={<AdminUi updatePost={true} />}
              />

              {/* Admin CREATORS */}
              <Route
                path="creators"
                element={<AdminUi creatorsPage={true} />}
              />
              <Route
                path="creators/:id"
                element={<AdminUi viewCreator={true} />}
              />
              <Route
                path="creators/:id/edit"
                element={<AdminUi updateCreator={true} />}
              />

              {/* Admin FOODIES */}
              <Route path="foodies" element={<AdminUi foodiesPage={true} />} />
              <Route
                path="foodies/:id"
                element={<AdminUi viewFoodie={true} />}
              />
              <Route
                path="foodies/:id/edit"
                element={<AdminUi updateFoodie={true} />}
              />

              {/* Admin SETTINGS */}
              <Route
                path="settings"
                element={<AdminUi settingsPage={true} />}
              />

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
