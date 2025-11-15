import React from "react";

type NavItem = {
    icon?: React.ReactNode;
    text?: string;
    onClick?: (index: number) => void;
};

type TopNavbarProps = {
    leftButton?: NavItem;
    middleButton?: NavItem;
    rightButton?: NavItem;
    activeIndex?: number;
};

export default function TopNavbar(props: TopNavbarProps) {
    const { middleButton, rightButton, leftButton } = props;
    return (
        <nav
            className="fixed top-0 left-0 right-0 bg-[#52733F] backdrop-blur-md shadow-lg safe-area-inset-b z-50"
        >
            <ul className="flex items-center h-10">
                <div className="flex w-1/5 justify-left">
                    {leftButton && (
                        <div
                            className={`flex items-center justify-center rounded-full transition-all duration-200 px-2`}
                            onClick={() => leftButton.onClick && leftButton.onClick(0)}
                        >
                            {leftButton?.icon}
                        </div>
                    )}
                </div>
                <div className="flex w-3/5 justify-center">
                    {middleButton && middleButton.text !== undefined && (
                        <div className='w-full flex items-center'>
                            <h1 className="text-[17px] font-bold text-center w-full text-[#C2E9AB] uppercase">
                                {middleButton.text}
                            </h1>
                        </div>
                    )}
                </div>
                <div className="flex w-1/5 justify-center">
                    {rightButton && (
                        <div
                            className={`w-7 flex items-center justify-center rounded-full transition-all duration-200`}
                            onClick={() => rightButton.onClick && rightButton.onClick(0)}
                        >
                            {rightButton?.icon}
                        </div>
                    )}
                </div>

            </ul>
        </nav>
    );
}
