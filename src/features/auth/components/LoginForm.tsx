import React, { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../../components/Alert';
import Input from '../../../components/Input';
import Modal from '../../../components/Modal';
import SquareButton from '../../../components/buttons/SquareButton';
import type { StatusMessage } from '../../../models/StatusMessage';
import type { LoginData } from '../../../models/features/Auth';
import { Login } from '../services/LoginService';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<StatusMessage | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData: LoginData = { email, password };
    const { data, error, status } = await Login(loginData);

    if (error) {
      setMessage({ type: 'error', text: `Erro ao fazer login: ${error}` });
      return;
    }

    if (status === 200 || status === 201) {
      const { id } = JSON.parse(data);
      localStorage.setItem('login-cache', JSON.stringify({ id, timestamp: Date.now() }));
      navigate('/feed');
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="w-full">
      {message && <Alert type={message.type} text={message.text} />}
      <Modal title="É ótimo te ver de volta!" titleClass="text-xl" extClassName='rounded-md'>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex flex-col gap-3 mt-4">
            <SquareButton type="submit" text="Entrar" />
            <SquareButton
              text="Crie sua conta"
              backgroundHidden={true}
              onClick={() => navigate('/register')}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LoginForm;
