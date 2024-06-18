import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL,
  headers: {
    apikey: import.meta.env.VITE_SUPABASE_KEY,
  },
});

export default axiosInstance;