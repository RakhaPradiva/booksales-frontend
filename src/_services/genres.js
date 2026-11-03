import API from "../_api";

export const getGenres = async () => {
  const { data } = await API.get("/genres");
  return data.data;
};

export const createGenre = async (data) => {
  try {
    const res = await API.post("/genres", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
