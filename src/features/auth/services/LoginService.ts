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

export async function VerifyAuth(): Promise<boolean> {
  const cache = localStorage.getItem("login-cache");
  if (!cache) return false;

  try {
    const { timestamp } = JSON.parse(cache);
    const expired = Date.now() - timestamp > 24 * 60 * 60 * 1000; // exemplo: expira em 24h
    if (expired) return false;
    return true;
  } catch {
    return false;
  }
}


export function Logout(navigate: NavigateFunction) {
    localStorage.removeItem('login-cache');
    navigate('/login');
}