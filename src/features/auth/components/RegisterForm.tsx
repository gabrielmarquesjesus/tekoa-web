import React, { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api/request';
import type { RegisterData } from '../../../models/Auth';
import { VerifyAuth } from '../services/LoginService';

interface Message {
    type: 'success' | 'error';
    text: string;
}

const RegisterForm = () => {

    const navigate = useNavigate();
    useEffect(() => {
        VerifyAuth(navigate);
    }, []);
    
    const [formData, setFormData] = useState<RegisterData>({
        name: '',
        surname: '',
        email: '',
        password: '',
        birthday: '',
    });
    const [message, setMessage] = useState<Message | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name || !formData.surname || !formData.email || !formData.password || !formData.birthday) {
            setMessage({ type: 'error', text: 'Preencha todos os campos.' });
            return;
        }
        const { data, error, status } = await api.post('/person/register', { ...formData })
        if (error || status !== 200) {
            setMessage({ type: 'error', text: 'Erro ao fazer registro: '+error });
            return;
        }
        setMessage({ type: 'success', text: 'Registro bem-sucedido! (Simulado)' });
    };

    React.useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-tl from-[#93CA74] to-[#C2E9AB] p-10 w-full h-full">
            <div className="w-full h-full card bg-white shadow-lg p-10 transition-transform transform hover:scale-[1.01] flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#25351C]">
                    Crie sua conta
                </h2>
                {message && (
                    <div
                        role="alert"
                        className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} mb-4 transition-all`}
                    >
                        <span>{message.text}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={formData.name}
                            onChange={handleChange}
                            className="input w-full border-l-[#52733F] border-2 bg-gray-100 dark:text-[#52733F] focus:border-2 focus:border-[#52733F] outline-0"
                        />
                        <input
                            type="text"
                            name="surname"
                            placeholder="Sobrenome"
                            value={formData.surname}
                            onChange={handleChange}
                            className="input w-full border-l-[#52733F] border-2 bg-gray-100 dark:text-[#52733F] focus:border-2 focus:border-[#52733F] outline-0"
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input w-full border-l-[#52733F] border-2 bg-gray-100 dark:text-[#52733F] focus:border-2 focus:border-[#52733F] outline-0"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleChange}
                        className="input w-full border-l-[#52733F] border-2 bg-gray-100 dark:text-[#52733F] focus:border-2 focus:border-[#52733F] outline-0"
                        />
                    <input
                        type="date"
                        name="birthday"
                        placeholder="Seu aniversário"
                        value={formData.birthday}
                        onChange={handleChange}
                        className="input w-full border-l-[#52733F] border-2 bg-gray-100 dark:text-[#52733F] focus:border-2 focus:border-[#52733F] outline-0"
                    />
                    <button
                        type="submit"
                        className="btn w-full border-0 rounded-md bg-gradient-to-r from-[#93CA74] to-[#749D5D] text-white shadow-lg hover:scale-[1.02] transition-transform"
                    >
                        Registrar
                    </button>
                </form>
                <button
                    onClick={() => navigate('/login')}
                    className="btn w-full btn-ghost rounded-xl text-[#25351C]"
                >
                    Fazer login
                </button>
            </div>
        </div>
    );
};

export default RegisterForm;
