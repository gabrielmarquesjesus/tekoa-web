import { useEffect, useRef, useState } from "react";
import { IoAddCircle, IoExit } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/request";
import BottomNavbar from "../../../components/BottomNavbar";
import Loading from "../../../components/Loading";
import ViewScroll from "../../../components/ViewScroll";
import { useLockScroll } from "../../../hooks/useLockBodyScroll";
import type { SimplePost } from "../../../models/features/Post";
import { Logout } from "../../auth/services/LoginService";
import CommentSection from "../components/CommentSection";
import FeedPost from "../components/FeedPost";

export default function Feed() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState<SimplePost[]>([])
    const [openCommentSection, setOpenCommentSection] = useState(false)
    const [loading, setLoading] = useState<boolean | null>(true)

    useEffect(() => {
        setLoading(true)
        const fetchPosts = async () => {
            const response = await api.get('/posts/simple');
            if (response.error) {
                console.error('Error fetching posts:', response.error);
                setTimeout(() => setLoading(false), 500)
                return;
            }
            if (response.data) {
                setPosts(response.data as SimplePost[]);
                setTimeout(() => setLoading(false), 500)
            }
        }
        fetchPosts();
        const intervalId = setInterval(fetchPosts, 200); // Atualiza a cada 60 segundos
        return () => clearInterval(intervalId);
    }, [])

    const scrollRef = useRef<HTMLDivElement>(null);
    useLockScroll(scrollRef, openCommentSection);

    if (loading == null || loading) return <Loading />

    return (
        <div>
            <ViewScroll ref={scrollRef}>
                {posts != undefined && posts.length > 0 ? (
                    <>
                        <div className="flex flex-col text-center py-2">
                            <p className="text-[#3c532e] text-2xl uppercase font-extralight" style={{fontFamily:"sans-serif"}}>registros da vida</p>
                        </div>
                        <div className="gap-6 flex flex-col">
                            {posts.map((post) => (
                                <FeedPost
                                    key={post.id}
                                    post={post}
                                    onOpenComment={() => setOpenCommentSection(true)}
                                />
                            ))}
                        </div>
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
                isOpen={!openCommentSection}
            />

            <CommentSection
                isOpen={openCommentSection}
                onClose={() => setOpenCommentSection(false)}
            />
        </div>
    );
}

