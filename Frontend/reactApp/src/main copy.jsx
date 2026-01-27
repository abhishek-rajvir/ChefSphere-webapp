import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/error/NotFoundPage.jsx";

import CreatorNavigationLayout from "./pages/profiles/Creator/CreatorNavigationLayout.jsx";
import AuthFilter from "./filters/AuthFilter.jsx";
import FoodieNavigationLayout from "./pages/profiles/Foodie/FoodieNavigationLayout.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthFilter Component={"empty"} />,
    errorElement: <NotFoundPage />,
  },
  { path: "/login", element: <LoginPage />, errorElement: <NotFoundPage /> },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <NotFoundPage />,
  },
  { path: "/about", element: <AuthFilter Component={AboutUs} /> },
  { path: "/home", element: <AuthFilter Component={HomePage} /> },

  // Creators routes
  {
    path: "/creators",
    children: [
      {
        path: "",
        element: (
          <AuthFilter Component={CreatorNavigationLayout} postPage={true} />
        ),
      },
      {
        path: ":param",
        element: <AuthFilter Component={CreatorNavigationLayout} />,
      },
      {
        path: "posts",
        element: (
          <AuthFilter Component={CreatorNavigationLayout} postPage={true} />
        ),
      },
      {
        path: "post/new",
        element: (
          <AuthFilter
            Component={CreatorNavigationLayout}
            postPage={true}
            newPost={true}
          />
        ),
      },
      {
        path: "post/:id/edit",
        element: (
          <AuthFilter
            Component={CreatorNavigationLayout}
            postPage={true}
            updatePost={true}
          />
        ),
      },
      {
        path: "post/:id",
        element: (
          <AuthFilter
            Component={CreatorNavigationLayout}
            postPage={true}
            viewPost={true}
          />
        ),
      },
      {
        path: "posts/:id",
        element: (
          <AuthFilter Component={CreatorNavigationLayout} postPage={true} />
        ),
      },
    ],
  },
  // Foodies routes
  {
    path: "/foodies",
    children: [
      { path: "", element: <Navigate to="/foodies/home" replace /> },
      {
        path: "search",
        element: (
          <AuthFilter Component={FoodieNavigationLayout} searchPage={true} />
        ),
      },
      {
        path: ":param",
        element: <AuthFilter Component={FoodieNavigationLayout} />,
      },
      {
        path: "creators/:id",
        element: (
          <AuthFilter Component={FoodieNavigationLayout} creatorPage={true} />
        ),
      },
      {
        path: "post/:id",
        element: (
          <AuthFilter
            Component={FoodieNavigationLayout}
            postPage={true}
            viewPost={true}
          />
        ),
      },
      {
        path: "category/:categoryName",
        element: (
          <AuthFilter Component={FoodieNavigationLayout} categoryPage={true} />
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
