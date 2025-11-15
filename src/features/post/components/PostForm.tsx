import { motion } from 'framer-motion';
import { useEffect, useState, type FormEvent } from 'react';
import { IoCamera } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';
import { DEFAULT_POST, PostCategories, type SimplePostReq } from '../../../models/features/Post';
import type { StatusMessage } from '../../../models/StatusMessage';
import PostPreview from '../../feed/components/PostPreview';
import PostCamera from '../pages/PostCamera';
import { CreatePost } from '../services/PostApi';


export default function NewPostForm() {
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<number>(DEFAULT_POST.value);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<StatusMessage | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("state", location.state);
    const handleViewportResize = () => {
      const viewport = window.visualViewport;
      if (viewport) {
        document.body.style.height = `${viewport.height}px`;
      }
    };

    if (location.state?.file) {
      const file: File = location.state.file;
      setImageFile(file);
    }

    if (location.state?.preview) {
      const preview: string = location.state.preview;
      setImagePreview(preview);
    }

    window.visualViewport?.addEventListener('resize', handleViewportResize);
    return () => window.visualViewport?.removeEventListener('resize', handleViewportResize);
  }, []);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      console.log('Dispositivos detectados:', devices);
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((a) => {
      console.log(a.coords)
    })
    if (!content.trim() || !category) {
      setMessage({ type: 'error', text: 'Preencha o conteúdo e selecione uma categoria.' });
      return;
    }

    setIsLoading(true);
    const cachedLogin = localStorage.getItem('login-cache');
    if (!cachedLogin) return;

    const { id: creatorID } = JSON.parse(cachedLogin);
    const postData: SimplePostReq = {
      id: '',
      content: content.trim(),
      category,
      createTime: new Date(),
      creatorID,
      groupID: '',
      imageFile,
    };

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
    navigate("/feed");
  };
  return (
    <div className='h-full'>
      {message && (
        <div role="alert" className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} mb-6 transition-all duration-300`}>
          <span>{message.text}</span>
        </div>
      )}

      {isCameraOpen && (
        <motion.div
          key="camera-modal"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{duration: 0.4 }}
          className="absolute z-50 flex justify-center items-center inset-0 will-change-transform will-change-opacity"

        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md transition-opacity duration-300 opacity-100" />

          <motion.div
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative z-10 h-full"
          >

            <Modal backgroundColor='transparent'>
              <PostCamera onCapture={(file, preview) => {
                setImageFile(file);
                setImagePreview(preview);
                setIsCameraOpen(false);
              }} setCameraMessage={setMessage} />
            </Modal>
          </motion.div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full w-screen">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="O que está acontecendo? Escreva aqui..."
          className="textarea textarea-bordered h-[40%] w-full border-l-[#52733F] border-2 bg-gray-100 dark:text-[#52733F] focus:border-[#52733F] outline-0"
          required
        />

        <div className='bg-[#C2E9AB] h-[60%] rounded-tr-4xl rounded-tl-4xl fixed bottom-0 p-5 w-full space-y-5 drop-shadow-2xl shadow-black'>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#25351C] font-bold text-md  ">Categoria da Publicação</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
              className="select select-bordered w-full rounded-xl bg-[#749D5D] focus:ring-3 focus:ring-[#93CA74] text-white font-medium"
              required
            >
              {PostCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {imageFile && !isCameraOpen && (
            <PostPreview
              imagePreview={imagePreview ?? ""}
              content={content}
              category={category}
              onRemove={() => setImageFile(null)}
            />
          )}

          <div className='fixed bottom-5 left-0 w-full px-2 flex'>
            <IoCamera color='#25351C' className='w-[15%]' onClick={() => setIsCameraOpen(!isCameraOpen)} size={40} />
            <button
              type="submit"
              className="btn w-[80%] rounded-xl bg-gradient-to-r from-[#93CA74] to-[#749D5D] text-white shadow-xl transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl disabled:bg-gray-400 disabled:text-gray-600"
              disabled={isLoading || !content.trim() || !category}
            >
              {isLoading && <span className="loading loading-spinner"></span>}
              {isLoading ? 'Publicando...' : 'Publicar Agora'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
