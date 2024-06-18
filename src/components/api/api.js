import supabase from './supabaseClient';

export const getPlaces = async () => {
  const { data, error } = await supabase.from('places').select();
  if (error) {
    throw error;
  }
  return data;
};