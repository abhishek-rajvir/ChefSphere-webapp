import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/error/NotFoundPage.jsx";
import AuthPage from "./pages/Auth/AuthPage.jsx";
import CreatorNavigationLayout from "./pages/profiles/Creator/CreatorNavigationLayout.jsx";
import CreatorPage from "./pages/profiles/Creator/CreatorPage.jsx";
import AuthFilter from "./filters/AuthFilter.jsx";
import FoodieNavigationLayout from "./pages/profiles/Foodie/FoodieNavigationLayout.jsx";
import LoginForm from "./pages/Auth/LoginForm.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";

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
  { path: "/home", element: <AuthFilter Component={HomePage} /> },
  { path: "/auth", element: <AuthFilter Component={AuthPage} /> },
  // Creators routes
  {
    path: "/creators",
    children: [
      { path: "", element: <Navigate to="/creators/posts" replace /> },
      {
        path: ":param",
        element: <AuthFilter Component={CreatorNavigationLayout} />,
      },
      {
        path: "posts/new",
        element: (
          <AuthFilter
            Component={CreatorNavigationLayout}
            postPage={true}
            newPost={true}
          />
        ),
      },
      {
        path: "posts/:id/edit",
        element: (
          <AuthFilter
            Component={CreatorNavigationLayout}
            postPage={true}
            updatePost={true}
          />
        ),
      },
    ],
  },
  // Foodies routes
  {
    path: "/foodies",
    children: [
      { path: "", element: <Navigate to="/foodies/posts" replace /> },
      {
        path: ":param",
        element: <AuthFilter Component={FoodieNavigationLayout} />,
      },
      // {
      //   path: "posts/new",
      //   element: (
      //     <AuthFilter
      //       Component={FoodieNavigationLayout}
      //       postPage={true}
      //       newPost={true}
      //     />
      //   ),
      // },
      // {
      //   path: "posts/:id/edit",
      //   element: (
      //     <AuthFilter
      //       Component={FoodieNavigationLayout}
      //       postPage={true}
      //       updatePost={true}
      //     />
      //   ),
      // },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  //   <StrictMode>
  //     <BrowserRouter>
  //       <App />
  //   </StrictMode>
  <StrictMode>
    {/* <BrowserRouter> */}
    {/* Provide access to redux store */}
    {/* <Provider store={store}> */}
    {/* Entry point to app */}

    <RouterProvider router={router} />
    {/* <App /> */}
    {/* </Provider> */}
    {/* </BrowserRouter> */}
  </StrictMode>,
);
