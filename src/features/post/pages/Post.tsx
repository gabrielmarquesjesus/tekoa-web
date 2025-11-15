import React from 'react';
import NewPostForm from '../components/PostForm';
import TopNavbar from '../../../components/TopNavbar';
import { IoArrowBack } from 'react-icons/io5';

const PostPage: React.FC = () => {
  return (
    <div className="flex justify-center h-screen min-h-screen pt-10 w-full">
      <TopNavbar
        leftButton={{ icon: <IoArrowBack size={28} color="#C2E9AB" />, onClick: () => window.history.back() }}
        middleButton={{ text: 'Novo Registro' }}
      />
      <NewPostForm />
    </div>
  );
};

export default PostPage;
