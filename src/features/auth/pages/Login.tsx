import React from 'react';
import useInputFocus from '../../../hooks/useInputFocus';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  useInputFocus();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full overflow-auto p-10 bg-gradient-to-tl from-[#93CA74] to-[#C2E9AB]">
      <LoginForm />
    </div>
  );
};

export default LoginPage;