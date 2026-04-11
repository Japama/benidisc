let API_BASE = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE) {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    // For local development, prefer explicit backend at localhost:4000
    if (host === 'localhost' || host === '127.0.0.1') {
      API_BASE = 'http://localhost:4000/api';
    } else {
      // In production, assume backend is served under the same origin at /api
      API_BASE = `${window.location.origin}/api`;
    }
  } else {
    API_BASE = 'http://localhost:4000/api';
  }
}

export const BACKEND_BASE = API_BASE.replace(/\/api\/?$/, '');

export function buildImageSrc(url) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${BACKEND_BASE}${url}`;
}

export { API_BASE };

export default {
  API_BASE,
  BACKEND_BASE,
  buildImageSrc,
};
