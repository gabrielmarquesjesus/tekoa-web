import React from 'react';

interface ModalProps {
    title?: string;
    titleClass?: string;
    children?: React.ReactNode;
}

export default function Modal(props: ModalProps) {
    const { title, titleClass, children } = props;

    return (
        <div className="w-full h-full card bg-white shadow-lg p-6 transition-transform transform hover:scale-[1.01] flex flex-col justify-center">
            {title && (
                <h2 className={`text-3xl font-bold text-center mb-6 text-[#52733F] ${titleClass}`}>
                    {title}
                </h2>
            )}
            {children}
        </div>
    )
}