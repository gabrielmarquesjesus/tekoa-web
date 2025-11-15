// src/services/api.ts
export const API_HOST = import.meta.env.VITE_API_HOST;

interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
    searchParams?: Record<string, string | number | boolean>;
    headers?: HeadersInit;
    signal?: AbortSignal; // para cancelamento de request
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    status: number;
}

export async function apiRequest<T = any>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<ApiResponse<T>> {

    const isFormData = options.body instanceof FormData;

    const { method = 'GET', body, searchParams, headers = {}, signal } = options;

    const url = new URL(`${API_HOST}${endpoint}`);
    if (searchParams) {
        Object.entries(searchParams).forEach(([key, value]) => {
            if (value !== undefined && value !== null) url.searchParams.append(key, String(value));
        });
    }

    const fetchHeaders: HeadersInit = {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
    };

    const fetchOptions: RequestInit = {
        method,
        headers: fetchHeaders,
        signal,
    };

    if (body && method !== 'GET' ) {
        if(isFormData){
            fetchOptions.body = body;
        } else {
            fetchOptions.body = JSON.stringify(body);
        }
    }

    try {
        const response = await fetch(url.toString(), fetchOptions);
        const contentType = response.headers.get('Content-Type');

        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            return {
                status: response.status,
                error: typeof data === 'string' ? data : data?.message || 'Erro na requisição',
            };
        }

        return { status: response.status, data };
    } catch (err: any) {
        return { status: 0, error: err.message || 'Erro inesperado' };
    }
}

// --- Funções auxiliares para facilitar ---
export const api = {
    get: <T = any>(endpoint: string, searchParams?: RequestOptions['searchParams'], headers?: HeadersInit, signal?: AbortSignal) =>
        apiRequest<T>(endpoint, { method: 'GET', searchParams, headers, signal }),

    post: <T = any>(endpoint: string, body?: any, searchParams?: RequestOptions['searchParams'], headers?: HeadersInit) =>
        apiRequest<T>(endpoint, { method: 'POST', body, searchParams, headers }),

    put: <T = any>(endpoint: string, body?: any, searchParams?: RequestOptions['searchParams'], headers?: HeadersInit) =>
        apiRequest<T>(endpoint, { method: 'PUT', body, searchParams, headers }),

    patch: <T = any>(endpoint: string, body?: any, searchParams?: RequestOptions['searchParams'], headers?: HeadersInit) =>
        apiRequest<T>(endpoint, { method: 'PATCH', body, searchParams, headers }),

    delete: <T = any>(endpoint: string, body?: any, searchParams?: RequestOptions['searchParams'], headers?: HeadersInit) =>
        apiRequest<T>(endpoint, { method: 'DELETE', body, searchParams, headers }),
};
