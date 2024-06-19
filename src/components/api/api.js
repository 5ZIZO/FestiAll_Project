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

export const getCurrentUser = async () => {
  try {
    const { data: currentUser } = await supabase.auth.getUser();
    console.log("현재 로그인한 유저 => ", currentUser);
    return currentUser;
  } catch (error) {
    alert(error);
    console.error("로그인한 유저 불러오기 실패 => ", error);
  }
};
