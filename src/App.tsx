
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './features/auth/components/LoginForm';
import RegisterForm from './features/auth/components/RegisterForm';
import Feed from './features/feed/pages/Feed';
import PostPage from './features/post/pages/Post';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/feed" element={<Feed/>} />
        <Route path="/post/create" element={<PostPage/>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
