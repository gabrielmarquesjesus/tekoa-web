import React from 'react';
import useInputFocus from '../../../hooks/useInputFocus';
import RegisterForm from '../components/RegisterForm';

const RegisterPage: React.FC = () => {
  useInputFocus();

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-bl from-[#C2E9AB] to-[#93CA74] p-10">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
