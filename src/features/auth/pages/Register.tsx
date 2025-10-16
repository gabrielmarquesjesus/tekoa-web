import React from 'react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tl from-[#93CA74] to-[#C2E9AB] p-10 w-full h-full">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
