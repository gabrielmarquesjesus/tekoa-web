import { IoAddCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../../../components/BottomNavbar";

export default function Feed() {
    const navigate = useNavigate()
    return (
        <div className="h-screen flex flex-col bg-[#C2E9AB]/25">
            <div className="flex-1 overflow-y-auto grid grid-cols-1 gap-6 justify-items-center pt-6 pb-16">
            </div>

            <BottomNavbar
                items={[
                    { icon: <IoAddCircle size={28} color="#25351C"/>, onClick: () =>navigate("/post/create") },
                ]}
                activeIndex={0}
            />
        </div>
    );
}

