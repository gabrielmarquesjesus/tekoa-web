import { IoAddCircle } from "react-icons/io5";
import BottomNavbar from "../../../components/BottomNavbar";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";

const posts = [
    {
        image: "https://picsum.photos/id/1015/400/400",
        caption: "Uma tarde tranquila na montanha asdadsadsaddasasdsa asdsadsa asdsadsadsadsadsadasdasda aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasd",
    },
    {
        image: "https://picsum.photos/id/1025/400/400",
        caption: "Amigo peludo no quintal 🐶",
    },
    {
        image: "https://picsum.photos/id/1043/400/400",
        caption: "Flores que encontrei no caminho 🌸",
    },
    {
        image: "https://picsum.photos/id/1003/400/400",
        caption: "Paz à beira do lago 🌊",
    },
    {
        image: "https://picsum.photos/id/1043/400/400",
        caption: "Flores que encontrei no caminho 🌸",
    },
    {
        image: "https://picsum.photos/id/1003/400/400",
        caption: "Paz à beira do lago 🌊",
    },
];

export default function Feed() {

    const navigate = useNavigate()
    return (
        <div className="h-screen flex flex-col bg-[#C2E9AB]/25">
            {/* Conteúdo scrollável */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 gap-6 justify-items-center pt-6 pb-16">
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </div>

            {/* Navbar inferior */}
            <BottomNavbar
                items={[
                    { icon: <IoAddCircle size={28} color="#25351C"/>, onClick: () =>navigate("/post/create") },
                ]}
                activeIndex={0}
            />
        </div>
    );
}

