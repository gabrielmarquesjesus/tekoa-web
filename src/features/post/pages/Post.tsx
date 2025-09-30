import React from 'react';
import NewPostForm from '../components/PostForm';

const PostPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <NewPostForm />
    </div>
  );
};

export default PostPage;
