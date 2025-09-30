// components/BottomNavbar.tsx
import React from "react";

type NavItem = {
  icon: React.ReactNode;
  onClick: (index:number) => void;
};

type BottomNavbarProps = {
  items: NavItem[];
  activeIndex?: number;
};

export default function BottomNavbar({ items, activeIndex = 0 }: BottomNavbarProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-[#93CA74]/60 backdrop-blur-md shadow-lg
                 safe-area-inset-b z-50"
    >
      <ul className="flex justify-around items-center py-2">
        {items.map((item, index) => (
          <li
            key={index}
            className={`flex flex-col items-center text-xs cursor-pointer select-none transition-all duration-200
              ${
                activeIndex === index
                  ? "text-primary scale-110"
                  : "text-gray-500 hover:text-primary/80"
              }`}
            onClick={() => item.onClick(index)}
          >
            <div
              className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200
                ${
                  activeIndex === index
                    ? "bg-[#93CA74]/70 shadow-inner"
                    : "hover:bg-gray-100"
                }`}
            >
              {item.icon}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
