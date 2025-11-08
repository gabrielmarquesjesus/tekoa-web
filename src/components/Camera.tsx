import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import type { StatusMessage } from "../models/StatusMessage";

export interface CameraHandle {
    capture: () => void;
    stop: () => void;
}

export interface CameraProps {
    isCameraOpen: boolean;
    onCapture: (file: File, preview: string) => void;
    setMessage: (message: StatusMessage | null) => void;
    onStop?: () => void;
}

/**
 * Camera — Componente Headless (sem UI)
 * - controla câmera e captura, mas NÃO define layout ou botões
 * - expõe métodos via ref: capture(), stop()
 */
const Camera = forwardRef<CameraHandle, CameraProps>(
    ({ isCameraOpen, onCapture, setMessage, onStop }, ref) => {
        const videoRef = useRef<HTMLVideoElement | null>(null);
        const canvasRef = useRef<HTMLCanvasElement | null>(null);
        const streamRef = useRef<MediaStream | null>(null);

        useEffect(() => {
            if (isCameraOpen) startCamera();
            else stop();
            return () => stop();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isCameraOpen]);

        async function startCamera() {
            setMessage(null);

            if (!navigator.mediaDevices?.getUserMedia) {
                setMessage({ type: "error", text: "Navegador não suporta acesso à câmera." });
                return;
            }

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: { ideal: "environment" } },
                    audio: false,
                });

                streamRef.current = stream;
                const video = videoRef.current;
                if (!video) return;

                video.srcObject = stream;
                video.muted = true;
                video.setAttribute("playsinline", "true");

                try { await video.play(); } catch { }
            } catch (err: any) {
                const text =
                    err?.name === "NotAllowedError"
                        ? "Permissão negada para usar a câmera."
                        : "Não foi possível acessar a câmera.";
                setMessage({ type: "error", text });
                stop();
            }
        }

        function stop() {
            const stream = streamRef.current;
            if (stream) {
                stream.getTracks().forEach((t) => t.stop());
                streamRef.current = null;
            }
            if (videoRef.current) videoRef.current.srcObject = null;
            onStop?.();
        }

        function capture() {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            if (!video || !canvas) return;

            const w = video.videoWidth;
            const h = video.videoHeight;
            if (!w || !h) return;

            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.drawImage(video, 0, 0, w, h);
            const preview = canvas.toDataURL("image/jpeg", 0.9);

            canvas.toBlob((blob) => {
                if (!blob) return;
                const file = new File([blob], "captura.jpg", { type: "image/jpeg" });
                onCapture(file, preview);
                stop();
            }, "image/jpeg", 0.9);
        }

        // expõe os métodos para o parent
        useImperativeHandle(ref, () => ({ capture, stop }));

        return (
            <>
                <video ref={videoRef} playsInline muted className="w-full h-full object-cover" />
                <canvas ref={canvasRef} className="hidden" />
            </>
        );
    }
);

export default Camera;
