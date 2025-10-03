import React, { useEffect, useRef, useState, type FormEvent } from 'react';
import { DEFAULT_POST, PostCategories, type Post, type SimplePostReq } from '../../../models/Post';
import { CreatePost } from '../services/PostApi';


// Interface para as mensagens de feedback
interface FeedbackMessage {
  type: 'success' | 'error';
  text: string;
}

const NewPostForm: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<number>(DEFAULT_POST.value);
  const [imageFile, setImageFile] = useState<File | null>(null); // Armazena a imagem capturada (Base64)
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Armazena a imagem capturada (Base64)
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<FeedbackMessage | null>(null);

  // Referências tipadas para elementos DOM
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Efeito para ligar ou desligar a câmera
  useEffect(() => {
    if (isCameraOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    // Cleanup function para desligar a câmera quando o componente for desmontado
    return () => stopCamera();
  }, [isCameraOpen]);

  // Função para solicitar permissão e iniciar o stream da câmera
  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMessage({ type: 'error', text: 'A API da câmera não é suportada neste navegador.' });
      setIsCameraOpen(false);
      return;
    }

    const constraints: MediaStreamConstraints = {
      video: { facingMode: { ideal: 'environment' } },
      audio: false
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true; // autoplay em mobile
        await videoRef.current.play(); // força início do vídeo
      }
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      setMessage({ type: 'error', text: 'Permissão da câmera negada ou indisponível.' });
      setIsCameraOpen(false);
    }
  };


  // Função para parar o stream da câmera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      // Obtém todas as trilhas (tracks) do stream e as interrompe
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Função para capturar a imagem do vídeo para o Canvas e converter para Base64
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    // Ajusta o canvas para o tamanho do vídeo
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Desenha o frame do vídeo no canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageBase64 = canvas.toDataURL('image/jpeg');
    setImagePreview(imageBase64);

    canvas.toBlob((blob) => {
      if (!blob) return;

      // Você pode transformar em File (caso precise de nome)
      const file = new File([blob], "captura.jpg", { type: "image/jpeg" });

      setImageFile(file); // salva no estado para mandar pro backend
      setIsCameraOpen(false);
    }, "image/jpeg", 0.9)
  };

  // Envia o formulário (Lógica simulada)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !category) {
      setMessage({ type: 'error', text: 'Preencha o conteúdo e selecione uma categoria.' });
      return;
    }

    setIsLoading(true);
    var creatorID: string;
    const cachedLogin = localStorage.getItem('login-cache');
    if (cachedLogin) {
      const { id } = JSON.parse(cachedLogin);
      creatorID = id;
      const postData: SimplePostReq = {
        id: '',
        content: content.trim(),
        category: category,
        createTime: new Date(),
        creatorID: creatorID,
        groupID: '',
        imageFile: imageFile ? imageFile : null,
      };
      console.log('Dados do Novo Post para envio:', postData);

      const error = await CreatePost(postData);
      if (error) {
        setMessage({ type: 'error', text: error.message });
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setMessage({ type: 'success', text: 'Postagem criada com sucesso!' });
      setContent('');
      setCategory(DEFAULT_POST.value);
      setImageFile(null);
    }

  };

  return (
    <div className="flex flex-col items-center h-screen w-full bg-[#C2E9AB]/25 p-4">

      <h1 className="text-2xl font-extrabold text-center w-full mb-2 text-[#25351C]">
        Novo registro
      </h1>

      {message && (
        <div role="alert" className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} mb-6 transition-all duration-300`}>
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 justify-between flex flex-col h-full">
        <div className="flex flex-col space-y-4 pt-2">
          <div className="form-control">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="O que está acontecendo? Escreva aqui..."
              className="textarea textarea-bordered h-42 w-full border-l-[#52733F] border-2 bg-gray-100 dark:text-[#52733F] focus:border-2 focus:border-[#52733F] outline-0"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#25351C] font-medium">Categoria da Publicação</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
              className="select select-bordered w-full rounded-xl bg-[#749D5D] focus:ring-3 focus:ring-[#93CA74] transition-all duration-200 text-white font-medium"
              required
            >
              {PostCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                if (imageFile) {
                  setImageFile(null);
                } else {
                  setIsCameraOpen(!isCameraOpen);
                }
              }}
              className={`btn btn-sm text-sm rounded-full transition-all duration-300 transform shadow-md
                  ${imageFile ? 'btn-error' : 'btn-ghost text-blue-500 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-800'}`
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {imageFile ? (
                  // Ícone de Lixeira (Remover)
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                ) : (
                  // Ícone de Câmera
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.865-1.297A2 2 0 0111.42 5h1.16a2 2 0 011.664.89l.865 1.297A2 2 0 0017.07 7H18a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V9z" />
                )}
              </svg>
              {imageFile ? 'Remover Foto' : 'Usar Câmera'}
            </button>

            {/* Pré-visualização da Imagem */}
            {imageFile && (
              <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                Foto pronta para postar.
              </span>
            )}
          </div>

          {/* Interface da Câmera (Modal simples) */}
          {isCameraOpen && (
            <div className="fixed inset-0 z-50 bg-black flex justify-center items-center">
              {/* Vídeo full screen */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Botão de Captura */}
              <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                <button
                  type="button"
                  onClick={captureImage}
                  className="btn btn-circle btn-lg btn-secondary shadow-lg border-4 border-white dark:border-gray-800"
                >
                  {/* Ícone de captura */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.008-1.008A5.002 5.002 0 008 2a5 5 0 00-3.707 1.293L2.293 4.586A1 1 0 012 5zM10 7a3 3 0 100 6 3 3 0 000-6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Botão de Fechar */}
              <button
                type="button"
                onClick={() => setIsCameraOpen(false)}
                className="absolute top-10 right-10 btn btn-error btn-circle"
              >
                ✕
              </button>
            </div>
          )}


          {/* Pré-visualização da Imagem Capturada (Depois de fechar a câmera) */}
          {imageFile && !isCameraOpen && (
            <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
              <img
                src={imagePreview ?? ""}
                alt="Pré-visualização da Postagem"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>


        {/* Botão de Publicar */}
        <div className=" w-full relative">
          <button
            type="submit"
            className="btn w-full rounded-xl bg-gradient-to-r from-[#93CA74] to-[#749D5D] text-white shadow-xl transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl disabled:bg-gray-400 disabled:text-gray-600"
            disabled={isLoading || !content.trim() || !category}
          >
            {isLoading && <span className="loading loading-spinner"></span>}
            {isLoading ? 'Publicando...' : 'Publicar Agora'}
          </button>
        </div>
      </form>

      {/* O Canvas é necessário para a captura, mas permanece hidden */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default NewPostForm;
