import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../components/api/axiosInstance';

const fetchPlaces = async () => {
    const response = await axiosInstance.get('/rest/v1/places', {
        headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_KEY,
        },
    });
    return response.data;
};

const usePlaces = () => {

    return useQuery({
        queryKey: ['places'],
        queryFn: fetchPlaces,
    });
};

export default usePlaces;