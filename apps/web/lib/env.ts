if (!process.env.NEXT_PUBLIC_BACKEND_URL) throw new Error('NEXT_PUBLIC_BACKEND_URL Must Be inside env');
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
