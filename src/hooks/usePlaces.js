import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../components/api/axiosInstance';
import useStore from '../store/useStore';

const fetchPlaces = async () => {
  const { data } = await axiosInstance.get('/rest/v1/places');
  return data;
};

const usePlaces = () => {
  const setPlaces = useStore((state) => state.setPlaces);

  return useQuery({
    queryKey: ['places'],
    queryFn: fetchPlaces,
    onSuccess: (data) => {
      setPlaces(data);
    },
  });
};

export default usePlaces;