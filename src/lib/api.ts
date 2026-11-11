/**
 * Client API utility to communicate with the FastAPI backend service
 * Routed through Vercel's multi-service rewrite /api/(.*) -> backend
 */

export const API_BASE_URL = typeof window !== 'undefined'
  ? '' // In production & preview on Vercel, requests to /api are proxied to the backend service
  : (process.env.VITE_API_BASE_URL || 'http://localhost:8000');

export async function fetchFromBackend<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Backend API error (${res.status}): ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

