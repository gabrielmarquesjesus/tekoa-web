
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './features/auth/components/LoginForm';
import RegisterForm from './features/auth/components/RegisterForm';
import Feed from './features/feed/pages/Feed';
import PostPage from './features/post/pages/Post';
import ProtectedRoute from './layout/ProtectedRoute';
import LoginPage from './features/auth/pages/Login';
import RegisterPage from './features/auth/pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/feed" element={
          <ProtectedRoute route='/feed'>
            <Feed />
          </ProtectedRoute>} />

        <Route path="/post/create" element={
          <ProtectedRoute route='/post/create'>
            <PostPage />
          </ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
