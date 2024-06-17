import { useQuery } from 'react-query';
import axiosInstance from '../api/axiosInstance';
import useStore from '../store/useStore';

const fetchPlaces = async () => {
  const { data } = await axiosInstance.get('/rest/v1/places');
  return data;
};

const usePlaces = () => {
  const setPlaces = useStore((state) => state.setPlaces);

  return useQuery('places', fetchPlaces, {
    onSuccess: (data) => {
      setPlaces(data);
    },
  });
};

export default usePlaces;