import { useMemo } from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { API_HOST } from "../../../api/request";
import { GetCategoryName, type SimplePost } from "../../../models/features/Post";

interface PostProps {
  post: SimplePost;
  onOpenComment: (post: SimplePost)=>void
}

export default function FeedPost({ post, onOpenComment}: PostProps) {
  const rotation = useMemo(() => {
    const angle = Math.floor(Math.random() * 4) - 2; // -2 a 2 graus
    return `rotate(${angle}deg)`;
  }, []);

  return (
    <div
      className="bg-white shadow-lg p-4 w-88 max-h-[470px] mx-auto cursor-pointer transition-transform"
      style={{ transform: rotation }}
    >
      {post.image_path && (
        <img
          src={post.image_path.includes("base64") ? post.image_path : API_HOST + "/post/image?filepath=" + post.image_path}
          alt={post.content}
          className="w-full max-h-90 object-cover"
        />
      )}

      <header className="flex justify-between">
        <h3 className="text-lg font-semibold mt-2">{post.creator_name}</h3>
        <div className="text-sm text-gray-400 mt-2 font-light italic">{GetCategoryName(post.category)}</div>
      </header>

      <p
        className="text-left text-sm text-gray-700 break-words overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 6,
          WebkitBoxOrient: "vertical",
          maxWidth: "100%",
        }}
      >
        {post.content}
      </p>
      <footer className="flex justify-end">
        <IoChatbubbleOutline size={20} onClick={()=>onOpenComment(post)}/>
      </footer>
    </div>
  );
}
