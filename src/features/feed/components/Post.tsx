import { useMemo } from "react";

export interface Post {
  image: string;
  caption: string;
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const rotation = useMemo(() => {
    const angle = Math.floor(Math.random() * 3) - 1; // -1 a 2
    return `rotate(${angle}deg)`;
  }, []);

  return (
    <div
      className="bg-white shadow-lg p-4 w-88 h-[450px] mx-auto cursor-pointer transition-transform"
      style={{ transform: rotation }}
    >
      <img
        src={post.image}
        alt={post.caption}
        className="w-full max-h-74 object-cover"
      />
      <p
        className="text-left mt-2 text-sm text-gray-700 break-words overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 6,
          WebkitBoxOrient: "vertical",
          maxWidth: "100%",
        }}
      >
        {post.caption}
      </p>
    </div>
  );
}
