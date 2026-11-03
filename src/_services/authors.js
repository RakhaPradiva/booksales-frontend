import API from "../_api";

export const getAuthors = async () => {
  const { data } = await API.get("/authors");
  return data.data;
};

export const createAuthor = async (data) => {
  try {
    const res = await API.post("/authors", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
