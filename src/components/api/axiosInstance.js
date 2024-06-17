import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SUPABASE_URL,
  headers: {
    apikey: process.env.REACT_APP_SUPABASE_KEY,
  },
});

export default axiosInstance;