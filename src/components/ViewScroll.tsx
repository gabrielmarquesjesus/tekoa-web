interface ViewScrollProps {
    children: React.ReactNode;
    background?: string
}

export default function ViewScroll(props: ViewScrollProps) {
    const { children, background } = props
    return (
        <div className={`h-screen flex flex-col  ${background ? background : "bg-[#C2E9AB]/25"}`}>
            <div className="flex-1 overflow-y-auto grid grid-cols-1 gap-6 justify-items-center pt-6 pb-16">
                {children}
            </div>
        </div>
    )
}