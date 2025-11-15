import { useState } from "react";
import { createPortal } from "react-dom";
import { type SimplePost } from "../../../models/features/Post";
import Post from "./FeedPost";
interface PostPreviewProps {
    imagePreview: string; // base64 da imagem
    content: string;
    category: number;
    onRemove: () => void;
}

export default function PostPreview({ imagePreview, content, category, onRemove }: PostPreviewProps) {
    const [isOpen, setIsOpen] = useState(false);

    const fakePost: SimplePost = {
        id: "preview",
        creator_name: "Você",
        content,
        category,
        create_time: new Date(),
        image_path: imagePreview,
    };

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="relative w-fit h-20 flex justify-center bg-[#F4FFF0] border border-[#B7D9A7] p-1 cursor-pointer shadow-md hover:shadow-lg transition"
            >
                <img
                    src={imagePreview}
                    alt="Prévia"
                    className="w-14 h-14 object-cover border border-gray-300 shadow-sm"
                />
            </div>

            {isOpen && createPortal(
                <div className="fixed inset-0 bg-black/70 z-[999]">
                    <div className="h-full flex flex-col justify-center items-center space-y-20">
                        <Post post={fakePost} onOpenComment={()=>{}}/>
                        <button className="btn bg-[#749D5D] border-none rounded-xl" onClick={() => setIsOpen(false)}>Fechar</button>
                    </div>
                </div>,
                document.body
            )}


        </>
    );
}
