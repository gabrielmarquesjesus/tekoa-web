import React from 'react';

type SquareButtonProps = {
    text?: string;
    icon?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    isActive?: boolean;
    backgroundHidden?: boolean;
};

const SquareButton = (props: SquareButtonProps) => {
    return (
        <button
            type={props.type || 'button'}
            className={`
                btn 
                w-full 
                border-0 
                rounded-md 
                ${!props.backgroundHidden ?
                    `bg-gradient-to-r 
                    from-[#93CA74] 
                    to-[#749D5D] 
                    text-white 
                    hover:scale-[1.02]
                    shadow-lg`
                    :
                    `bg-transparent  
                    text-[#25351C]
                    hover:scale-[1.03]
                    shadow-none`
                }  
                hover:scale-[1.02]
                transition-transform 
                ${props.isActive ?
                    `active`
                    :
                    ''
                }`
            }
            onClick={props.onClick}
        >
            {props.text}
            {props.icon}
        </button>
    );

};

export default SquareButton;
