import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChatbubbleOutline } from "react-icons/io5";
import { API_HOST } from "../../../api/request";
import { GetCategoryName, type SimplePost } from "../../../models/features/Post";

interface PostProps {
  post: SimplePost;
  onOpenComment: (post: SimplePost) => void;
}

export default function FeedPost({ post, onOpenComment }: PostProps) {
  const [expanded, setExpanded] = useState(false);

  const rotation = useMemo(() => {
    const angle = Math.floor(Math.random() * 4) - 2;
    return `rotate(${angle}deg)`;
  }, []);

  return (
    <div
      className={`relative bg-white shadow-lg p-4 w-88 ${expanded ? '' : 'max-h-[550px]'} mx-auto cursor-pointer transition-transform overflow-hidden`}
      style={{ transform: rotation }}
    >
      {post.image_path && (
        <div className="relative">
          <img
            src={
              post.image_path.includes("base64")
                ? post.image_path
                : API_HOST + "/post/image?filepath=" + post.image_path
            }
            alt={post.content}
            className="w-full max-h-90 object-cover rounded-md"
          />
        </div>
      )}

      <header className="flex justify-between">
        <h3 className="text-lg font-semibold mt-2">{post.creator_name}</h3>
        <div className="text-sm text-gray-400 mt-2 font-light italic">
          {GetCategoryName(post.category)}
        </div>
      </header>

      <p
        className="text-left text-sm text-gray-700 break-words overflow-hidden"
        style={expanded ? {
          lineHeight: "1.2em",
        } : {
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          lineHeight: "1.2em",
          maxHeight: "70px",
        }}
      >
        {post.content}
      </p>

      {post.content.length > 150 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#52733F] text-xs font-semibold mt-1 hover:underline transition"
        >
          {expanded ? "Ver menos" : "Ver mais"}
        </button>
      )}

      <footer className="flex justify-between items-center">
        <div className="text-sm text-gray-400 mt-2 font-light italic">
          {new Date(post.create_time).toLocaleDateString()}
        </div>
        <IoChatbubbleOutline
          size={20}
          onClick={() => onOpenComment(post)}
          className="cursor-pointer text-gray-600 hover:text-[#52733F] transition"
        />
      </footer>
    </div>
  );
}
