import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import CreatePostPage from "./pages/CreatePostPage.tsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} /> 
        <Route path="/posts/new" element={<CreatePostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
