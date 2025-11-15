import { useRef, useState } from "react";
import { IoCamera } from "react-icons/io5";
import type { CameraHandle } from "../../../components/Camera";
import Camera from "../../../components/Camera";
import type { StatusMessage } from "../../../models/StatusMessage";
import Loading from "../../../components/Loading";

interface PostCameraProps {
    onCapture?: (file: File, preview: string) => void;
    setCameraMessage?: (message: StatusMessage | null) => void;
}

export default function PostCamera({ onCapture, setCameraMessage }: PostCameraProps) {
    const cameraRef = useRef<CameraHandle | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    return (
        <div className=" pt-5 h-screen w-full">
            {isLoading &&(
                <Loading/>
            )}

            <div
                className={`bg-white p-4 shadow-lg w-88 max-h-[550px] mx-auto cursor-pointer transition-transform ${isLoading ? 'hidden' : 'block'}`}
            >
                <div
                    className=" w-full max-h-[470px]  h-[450px]  mx-auto cursor-pointer transition-transform"
                >
                    <Camera
                        ref={cameraRef}
                        isCameraOpen={true}
                        onCapture={onCapture || (() => {})}
                        setMessage={setCameraMessage || (() => {})}
                        onLoad={()=>setIsLoading(false)}
                    />
                </div>
                <div className="flex justify-between">
                    <h3 className="text-lg font-semibold mt-2">Você</h3>
                </div>
                <p
                    className="text-left text-sm text-gray-700 wrap-break-word overflow-hidden"
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
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 p-3 rounded-full shadow-lg bg-radial to-[#52733F] from-[#93CA74]"
                    onClick={() => cameraRef.current?.capture()}
                >
                    <IoCamera size={28} color="white"/>
                </button>
            </div>
        </div>
    );
}
