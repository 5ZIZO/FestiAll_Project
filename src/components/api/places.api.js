import supabase from "./supabaseClient";

export const getAllPlaces = async () => {
    let { data } = await supabase
    .from('places')
    .select("*") // 다 가져와
    return data; // 잊지마세용
};

export const postPlace = async (postData) => {
    const { 
        image, 
        post_name, 
        st_date, 
        ed_date, 
        st_time,
        ed_time,
        category, 
        pricing, 
        address, 
        description  
    } = postData
    const { data } = await supabase
    .from('places')
    .insert([
        { 
            image,
            name: post_name, 
            st_date,
            ed_date,
            st_time,
            ed_time,
            category,
            pricing,
            address,
            description,
        },
    ])
};
