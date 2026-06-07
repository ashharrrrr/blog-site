import { Routes, Route } from "react-router-dom";

import ReaderLayout from "./layouts/ReaderLayout";

import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

export default function App() {
  return (
    <Routes>
      <Route element={<ReaderLayout />}>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/posts/:slug"
          element={<PostPage />}
        />
      </Route>
    </Routes>
  );
}
