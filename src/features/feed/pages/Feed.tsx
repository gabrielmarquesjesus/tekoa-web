import { IoAddCircle, IoExit } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../../../components/BottomNavbar";
import { useEffect, useState } from "react";
import { api } from "../../../api/request";
import type { SimplePost } from "../../../models/features/Post";
import Post from "../components/Post";
import { Logout } from "../../auth/services/LoginService";
import ViewScroll from "../../../components/ViewScroll";

export default function Feed() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState<SimplePost[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await api.get('/posts/simple');
            if (response.error) {
                console.error('Error fetching posts:', response.error);
                return;
            }
            if (response.data) {
                setPosts(response.data as SimplePost[]);
            }
        }
        fetchPosts();
    }, [])

    return (
        <div>
            <ViewScroll>
                {posts != undefined && posts.length > 0 ? (
                    <>
                        {posts.map((post) => (
                            <Post key={post.id} post={post} />
                        ))}
                    </>
                ) : (
                    <div className="flex flex-col text-center">
                        <p className="text-2xl font-semibold text-[#3c532e]">Ninguém por perto.</p>
                        <p className="text-md text-[#3c532e]">Mas não se preocupe, você pode ser <br />a primeira semente!.</p>
                    </div>
                )}
            </ViewScroll>

            <BottomNavbar
                leftButtons={[
                    { icon: <IoExit size={28} color="#25351C" />, onClick: () => Logout(navigate) },
                ]}
                middleButtons={[
                    { icon: <IoAddCircle size={28} color="#25351C" />, onClick: () => navigate("/post/create") }
                ]}
                activeIndex={0}
            />
        </div>
    );
}

