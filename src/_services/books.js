import API from "../_api";

export const getBooks = async () => {
  const { data } = await API.get("/books");
  return data.data;
};

export const createBook = async (data) => {
  try {
    const res = await API.post("/books", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
