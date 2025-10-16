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

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [message, setMessage] = useState<StatusMessage | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var loginData: LoginData = { email: email, password: password }

        const { data, error, status } = await Login(loginData)
        if (error) {
            setMessage({ type: 'error', text: `Erro ao fazer login: ${error}` });
            return;
        }
        if (status === 200 || status === 201) {
            console.log(data)
            const { id } = JSON.parse(data)
            localStorage.setItem('login-cache', JSON.stringify({ id: id, timestamp: Date.now() }));
        }
        navigate('/feed');
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div>
            {message && (
                <Alert type={message.type} text={message.text} />
            )}
            <Modal title="É ótimo te ver de volta!" titleClass="text-2xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type='password'
                        placeholder='Senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <SquareButton type="submit" text="Entrar" />
                </form>
                <SquareButton
                    text="Crie sua conta"
                    backgroundHidden={true}
                    onClick={() => navigate('/register')}
                />
            </Modal>
        </div>
    );
};

export default LoginForm;
