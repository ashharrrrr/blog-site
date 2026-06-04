import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import CreatePostPage from "./pages/CreatePostPage.tsx"
import PostPreviewPage from "./pages/PostPreviewPage.tsx"
import EditPostPage from "./pages/EditPostPage.tsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} /> 
        <Route path="/posts/new" element={<CreatePostPage />} />
        <Route path="/posts/:id" element={<PostPreviewPage />} />
        <Route path="/posts/:id/update" element={<EditPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
