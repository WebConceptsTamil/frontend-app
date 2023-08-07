import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import AddPost from "./components/AddPost";
import UpdatePost from "./components/UpdatePost";
import NotFound from "./components/NotFound";
import PostList from "./components/PostList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<PostList />} />
      <Route path="/create" element={<AddPost />} />
      <Route path="/update/:postid" element={<UpdatePost />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
