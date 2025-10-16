import { useEffect, useRef } from "react";
import { IoCamera } from "react-icons/io5";
import type { StatusMessage } from "../models/StatusMessage";
import BottomNavbar from "./BottomNavbar";

interface CameraProps {
    isCameraOpen: boolean;
    setImageFile: (file: File) => void;
    setImagePreview: (preview: string) => void;
    setMessage: (message: StatusMessage | null) => void;
    onStop: () => void;
}

export default function Camera(props: CameraProps) {

    const { isCameraOpen, setImageFile, setImagePreview, setMessage, onStop } = props;

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (isCameraOpen) {
            startCamera();
        } else {
            stopCamera();
        }
    }, [isCameraOpen]);

    const startCamera = async () => {
        try {
            console.log('Iniciando câmera...');
            if (videoRef.current?.srcObject) return; // Previni load duplicado

            if (!navigator.mediaDevices?.getUserMedia) {
                setMessage({ type: 'error', text: 'Seu navegador não suporta acesso à câmera.' });
                return;
            }

            // Tenta pegar qualquer câmera disponível
            const constraints: MediaStreamConstraints = {
                video: { facingMode: 'environment' },
                audio: false,
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            if (!videoRef.current) return;
            videoRef.current.srcObject = stream;

            // play() pode falhar — capturar o erro explicitamente
            videoRef.current.muted = true;
            videoRef.current
                .play()
                .then(() => console.log('Câmera iniciada com sucesso'))
                .catch((err) => {
                    console.warn('Falha ao reproduzir vídeo:', err);
                    setMessage({ type: 'error', text: 'Não foi possível exibir a câmera.' });
                    stopCamera();
                });
        } catch (error: any) {
            console.error('Erro ao acessar câmera:', error);
            setMessage({ type: 'error', text: 'Permissão negada ou câmera indisponível.' });
        }
    };

    const stopCamera = () => {
        if (!videoRef.current) return;
        const stream = videoRef.current.srcObject as MediaStream | null;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        videoRef.current.srcObject = null;
        onStop();
    };


    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const context = canvas.getContext('2d');
        if (!context) return;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageBase64 = canvas.toDataURL('image/jpeg');
        setImagePreview(imageBase64);
        canvas.toBlob((blob) => {
            if (!blob) return;
            const file = new File([blob], "captura.jpg", { type: "image/jpeg" });
            setImageFile(file);
        }, "image/jpeg", 0.9);
        stopCamera()
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black h-screen" style={{ display: isCameraOpen ? "block" : "none" }}>
            <div className="relative w-full max-w-md aspect-square bg-black  h-screen">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-contain bg-black rounded-lg"
                ></video>

                <BottomNavbar
                    middleButtons={[{ icon: <IoCamera size={35} />, onClick: () => captureImage() }]}
                />
            </div>
            <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
    );
}