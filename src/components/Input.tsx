import React from "react";

interface InputProps {
    type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'textarea';
    name?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    classNameExtra?: string;
    required?: boolean
}

const Input = (props: InputProps) => {
    return (
        <>
            {props.type == "textarea" ? (
                <textarea
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={(e) => props.onChange ? props.onChange(e) : undefined}
                    className={`input w-full border-l-[#52733F] resize-none border-2 bg-gray-100 dark:text-[#52733F] focus:border-2 focus:border-[#52733F] outline-0 ${props.classNameExtra}`}
                    required={props.required}
                />
            ) : (
                <input
                    type={props.type ?? 'text'}
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={(e) => props.onChange ? props.onChange(e) : undefined}
                    className={`input w-full border-l-[#52733F] border-2 bg-gray-100 dark:text-[#52733F] focus:border-2 focus:border-[#52733F] outline-0 ${props.classNameExtra}`}
                    required={props.required}
                />
            )}
        </>
    )
}

export default Input;