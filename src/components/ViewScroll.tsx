import { forwardRef } from "react";

interface ViewScrollProps {
    children: React.ReactNode;
    background?: string;
    classNameExt?: string;
}

const ViewScroll = forwardRef<HTMLDivElement, ViewScrollProps>(({ children, background, classNameExt }, ref) => {
    return (
        <div className={`h-screen flex flex-col ${background ?? "bg-[#C2E9AB]/25"}`}>
            <div ref={ref} className={`flex flex-col overflow-y-auto justify-items-center ${classNameExt}`}>
                {children}
            </div>
        </div>
    );
});

export default ViewScroll;
