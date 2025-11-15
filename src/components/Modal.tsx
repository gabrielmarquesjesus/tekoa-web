import React from 'react';

interface ModalProps {
  title?: string;
  titleClass?: string;
  children?: React.ReactNode;
  backgroundColor?: string;
  extClassName?: string;
}

export default function Modal({ title, titleClass, children, backgroundColor, extClassName }: ModalProps) {
  return (
    <div
      className={`w-full max-w-sm  rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center ${
        backgroundColor || 'bg-white'
      } ${extClassName || ''}`}
    >
      {title && (
        <h2 className={`text-2xl font-bold text-center mb-6 text-[#52733F] ${titleClass || ''}`}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
