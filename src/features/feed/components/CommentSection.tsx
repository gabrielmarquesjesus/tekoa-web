import { useEffect, useRef, useState } from "react";
import { IoClose, IoSend } from "react-icons/io5";
import Input from "../../../components/Input";
import ViewScroll from "../../../components/ViewScroll";
import type { Comment } from "../../../models/features/Comment";

interface CommentSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommentSection({ isOpen: isOpenProp, onClose }: CommentSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  const commentScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpenProp) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpenProp]);

  //evita de o componente continuar no DOM
  if (!isVisible && !isOpenProp) return null;

  const commentList: Comment[] = [
    { id: 0, content: "Muito bom parabenasdsa", created_at: new Date(), post_id: 1, creator_id: 1, parent_id: 0 },
    { id: 0, content: "kkkkkkkkkkkkkk", created_at: new Date(), post_id: 1, creator_id: 1, parent_id: 0 },
    { id: 0, content: "aaaaaaaaaaaaaaa meu deus que loucura é essa senhor jesus amado", created_at: new Date(), post_id: 1, creator_id: 1, parent_id: 0 },
    { id: 0, content: "aaaaaaaaaaaaaaa meu deus que loucura é essa senhor jesus amado", created_at: new Date(), post_id: 1, creator_id: 1, parent_id: 0 },
    { id: 0, content: "aaaaaaaaaaaaaaa meu deus que loucura é essa senhor jezxcxzcxzcxzcxzcx zzczccxxzc xzc zxz cz xcz cz czxczxcxzc zc z zxczczcxzcxzcxzcz zxsus amado", created_at: new Date(), post_id: 1, creator_id: 1, parent_id: 0 },
    { id: 0, content: "aaaaaaaaaaaaaaa meu deus que loucura é essa senhor jesus amado", created_at: new Date(), post_id: 1, creator_id: 1, parent_id: 0 },
    { id: 0, content: "kkkkkkkkkkkkkkkkkkkkkkkkkk", created_at: new Date(), post_id: 1, creator_id: 1, parent_id: 0 },
  ]

  return (
    <div
      className={`h-full w-full bg-[#3c532e]/50 absolute z-50 bottom-0 inset-0 flex justify-center items-end 
      ${isOpenProp ? "animate-fade-in" : "animate-fade-out"} overflow-hidden`}
    >
      <div
        className={`w-full max-h-[70%] bg-white shadow-2xl shadow-black rounded-tr-2xl rounded-tl-2xl px-5 pt-3 flex flex-col
        ${isOpenProp ? "animate-slide-up" : "animate-slide-down"}`}
      >
        <header className="flex relative mb-5 justify-between">
          <h3 className="text-center font-medium text-md text-[#3c532e]">Cometários</h3>
          <button
            className="text-black"
            onClick={onClose}
          >
            <IoClose size={25} color="#3c532e" />
          </button>
        </header>
        <ViewScroll ref={commentScrollRef} background="bg-white" classNameExt="overflow-y-auto max-h-[70%] ">
          {commentList?.map((comment) => (
            <div
              key={comment.id}
              className="w-full borderflex flex-col px-2 py-2 "
            >
              <p className="text-sm font-bold">Gabriel</p>
              <p
                className="w-full break-words font-stretch-50%"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: "1.2em",
                  maxHeight: "70px",
                }}
              >
                {comment.content}
              </p>
              <p className="italic text-xs text-right">
                {comment.created_at.toDateString()}
              </p>
              <div className="w-full h-[1px] bg-[#3c532e] opacity-25 mt-2"></div>
            </div>

          ))}
        </ViewScroll>

        <div className="w-full absolute z-20 bottom-0 right-0 px-5 py-2 flex bg-white">
          <Input type="textarea" classNameExtra="h-[100px] mr-5" />
          <IoSend className="self-center" size={25} color="#3c532e" />
        </div>
        <div className="w-full h-[130px] z-10 absolute bottom-5 right-0 flex bg-white blur-md">
        </div>
      </div>
    </div>
  );
}
