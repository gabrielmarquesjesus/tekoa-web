import { useRef, useState } from "react";
import { IoCamera } from "react-icons/io5";
import type { StatusMessage } from "../../../models/StatusMessage";
import type { CameraHandle } from "../../../components/Camera";
import Camera from "../../../components/Camera";
import { useNavigate } from "react-router-dom";

export default function PostCamera() {
    const cameraRef = useRef<CameraHandle | null>(null);
    const [message, setMessage] = useState<StatusMessage | null>(null);
    const navigate = useNavigate();

    function handleCapture(file: File, preview: string) {
        navigate("/post/create", { state: { file, preview, fromCamera: true } });
    }

    return (
        <div
            className="bg-white p-4 shadow-lg w-88 max-h-[550px] mx-auto cursor-pointer transition-transform"
        >
            <div
                className=" w-full max-h-[470px] mx-auto cursor-pointer transition-transform"
            >
                <Camera
                    ref={cameraRef}
                    isCameraOpen={true}
                    onCapture={handleCapture}
                    setMessage={setMessage}
                />
            </div>
            <div className="flex justify-between">
                <h3 className="text-lg font-semibold mt-2">Você</h3>
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
                sadsa
            </p>
            <button
                aria-label="Tirar foto"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 p-3 rounded-full shadow-lg bg-white"
                onClick={() => cameraRef.current?.capture()}
            >
                <IoCamera size={28} />
            </button>
        </div>
    );
}
