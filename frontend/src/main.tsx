import { createRoot } from "react-dom/client";

import App from "./pages/App.tsx";
import GenertedImage from "./pages/GeneratedImage.tsx";
import NotFound from "./pages/404.tsx";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { StrictMode } from "react";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/image",
    element: <GenertedImage />,
    errorElement: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
