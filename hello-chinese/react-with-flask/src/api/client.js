const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export async function apiRequest(endpoint, options = {}) {
    if (!API_URL) {
        throw new Error("VITE_API_URL is not set — rebuild the frontend with it defined.");
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers, 
        }
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
}