import React, { useEffect, useState } from "react";

type NavItem = {
  icon: React.ReactNode;
  onClick: (index: number) => void;
};

type BottomNavbarProps = {
  middleButtons?: NavItem[];
  rightButtons?: NavItem[];
  leftButtons?: NavItem[];
  activeIndex?: number;
  isOpen?: boolean
};

export default function BottomNavbar(props: BottomNavbarProps) {
  const { middleButtons, rightButtons, leftButtons, activeIndex = -1 } = props;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (props.isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [props.isOpen]);

  //evita de o componente continuar no DOM
  if (!isVisible && !props.isOpen) return null;
  return (
    <nav
      className={`fixed bottom-0 left-0
        right-0 bg-[#93CA74]
        backdrop-blur-md shadow-lg
        safe-area-inset-b z-50
        ${props.isOpen ? "animate-slide-up" : "animate-slide-down"}`
    }>
      <ul className="flex items-center py-2">
        <div className="flex w-1/3 justify-between px-5">
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

        <div className="flex w-1/3 justify-between px-5">
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
