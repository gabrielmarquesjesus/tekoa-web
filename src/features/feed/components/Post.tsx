import { useMemo } from "react";
import { API_HOST } from "../../../api/request";
import { GetCategoryName, type SimplePost } from "../../../models/features/Post";

interface PostProps {
  post: SimplePost;
}

export default function Post({ post }: PostProps) {
  const rotation = useMemo(() => {
    const angle = Math.floor(Math.random() * 4) - 2; // -1 a 2
    return `rotate(${angle}deg)`;
  }, []);

  return (
    <div
      className="bg-white shadow-lg p-4 w-88 max-h-[450px] mx-auto cursor-pointer transition-transform"
      style={{ transform: rotation }}
    >
      {post.image_path && (
        <img
          src={post.image_path.includes("base64") ? post.image_path : API_HOST + "/post/image?filepath=" + post.image_path}
          alt={post.content}
          className="w-full max-h-90 object-cover"
        />
      )}
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mt-2">{post.creator_name}</h3>
        <div className="text-sm text-gray-400 mt-2 font-light italic">{GetCategoryName(post.category)}</div>
      </div>
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
    </div>
  );
}
