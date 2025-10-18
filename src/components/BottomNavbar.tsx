// components/BottomNavbar.tsx
import React from "react";

type NavItem = {
  icon: React.ReactNode;
  onClick: (index: number) => void;
};

type BottomNavbarProps = {
  middleButtons?: NavItem[];
  rightButtons?: NavItem[];
  leftButtons?: NavItem[];
  activeIndex?: number;
};

export default function BottomNavbar(props: BottomNavbarProps) {
  const { middleButtons, rightButtons, leftButtons, activeIndex = -1 } = props;
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-[#93CA74] backdrop-blur-md shadow-lg
                 safe-area-inset-b z-50"
    >
      <ul className="flex items-center py-2">
        <div className="flex w-1/3 justify-between px-2">
          {leftButtons?.map((item, index) => (
            <div
              key={index}
              className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200`}
              onClick={() => item.onClick(index)}
            >
              {item.icon}
            </div>
          ))}
        </div>

        <div className="flex w-1/3 justify-center">
          {middleButtons?.map((item, index) => (
            <div
              key={index}
              className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200
                ${activeIndex === index
                  ? "bg-[#93CA74]/70 shadow-inner"
                  : "hover:bg-gray-100"
                }`}
              onClick={() => item.onClick(index)}
            >
              {item.icon}
            </div>
          ))}
        </div>

        <div className="flex w-1/3 justify-between">
          {rightButtons?.map((item, index) => (
            <div
              key={index}
              className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200
                ${activeIndex === index
                  ? "bg-[#93CA74]/70 shadow-inner"
                  : "hover:bg-gray-100"
                }`}
              onClick={() => item.onClick(index)}
            >
              {item.icon}
            </div>
          ))}
        </div>

      </ul>
    </nav>
  );
}
