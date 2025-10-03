import { type NavigateFunction } from "react-router-dom";

export function VerifyAuth(navigate: NavigateFunction) {
    const cachedLogin = localStorage.getItem('login-cache');
    if (cachedLogin) {
        const { timestamp } = JSON.parse(cachedLogin);
        if (Date.now() - timestamp < 30000) {
            navigate('/feed');
        } else {
            localStorage.removeItem('login-cache');
        }
    }
}