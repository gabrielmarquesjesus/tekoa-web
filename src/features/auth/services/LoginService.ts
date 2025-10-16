import { type NavigateFunction } from "react-router-dom";
import { api, type ApiResponse } from "../../../api/request";
import type { LoginData } from "../../../models/features/Auth";

export async function Login(loginData: LoginData): Promise<ApiResponse<any>> {
    var response: ApiResponse<any> = {status:200}
    response = await api.post('/person/login', loginData)
    if (response.error || response.status !== 200) {
        if (response.status === 401 || response.status === 400) {
            response.error = 'Credenciais inválidas.'
            return response;
        }
        response.error = `Erro ao fazer login: ${response.error}`
        return response;
    }
    return response;
}

export function VerifyAuth(navigate: NavigateFunction, route: string) {
    const cachedLogin = localStorage.getItem('login-cache');
    if (cachedLogin) {
        const { timestamp } = JSON.parse(cachedLogin);
        if (Date.now() - timestamp < 3000000) {
            navigate(route);
        } else {
            localStorage.removeItem('login-cache');
            navigate('/login');
        }
    } else {
        navigate('/login');
    }
}

export function Logout(navigate: NavigateFunction) {
    localStorage.removeItem('login-cache');
    navigate('/login');
}