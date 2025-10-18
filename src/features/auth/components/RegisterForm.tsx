import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api/request';
import Input from '../../../components/Input';
import SquareButton from '../../../components/buttons/SquareButton';
import type { RegisterData } from '../../../models/features/Auth';
import Alert from '../../../components/Alert';
import Modal from '../../../components/Modal';

interface Message {
    type: 'success' | 'error';
    text: string;
}

const RegisterForm = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [birthday, setBirthday] = useState("")


    const [message, setMessage] = useState<Message | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !surname || !email || !password || !birthday) {
            setMessage({ type: 'error', text: 'Preencha todos os campos.' });
            return;
        }
        const formData: RegisterData = { name, surname, email, password, birthday }
        const { data, error, status } = await api.post('/person/register', formData)
        if (error || (status !== 201 && status !== 201)) {
            setMessage({ type: 'error', text: 'Erro ao fazer registro: ' + error });
            return;
        }
        setMessage({ type: 'success', text: 'Registro bem-sucedido!' });
        setTimeout(()=>{
            navigate("/login")
        }, 1000)
    };

    React.useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div>
            {message && (
                <Alert text={message.text} type={message.type} />
            )}
            <Modal title='Comece sua jornada!'>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                    <Input
                        placeholder="Sobrenome"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                        />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    <Input
                        type="date"
                        placeholder="Seu aniversário"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                    <SquareButton
                        type="submit"
                        text='Registrar'
                        onClick={() => handleSubmit}
                    />
                </form>
                <SquareButton
                    text='Fazer login'
                    onClick={() => navigate('/login')}
                    backgroundHidden={true}
                />
            </Modal>
        </div>
    );
};

export default RegisterForm;
