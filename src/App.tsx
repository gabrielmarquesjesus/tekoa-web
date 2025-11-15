import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/pages/Login";
import RegisterPage from "./features/auth/pages/Register";
import Feed from "./features/feed/pages/Feed";
import PostPage from "./features/post/pages/Post";
import PostCamera from "./features/post/pages/PostCamera";
import ProtectedRoute from "./layout/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/feed" element={<ProtectedRoute> <Feed /> </ProtectedRoute>} />
        <Route path="/post/create" element={<ProtectedRoute> <PostPage /> </ProtectedRoute>} />
        <Route path="/post/camera" element={<ProtectedRoute> <PostCamera /> </ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>);
} export default App;