import supabase from "./supabaseClient";

export const getPlaces = async () => {
  const { data, error } = await supabase.from("places").select();
  if (error) {
    throw error;
  }
  return data;
};

export const getAnEvent = async ({ queryKey }) => {
  try {
    const { data: place } = await supabase
      .from("places")
      .select()
      .eq("post_id", queryKey[1]);
    return place[0];
  } catch (error) {
    console.error(error);
  }
};
