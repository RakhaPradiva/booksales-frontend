import { API } from "../_api";

export const getBooks = async () => {
  try {
    const { data } = await API.get("/books");
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
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

export const showBook = async (id) => {
  try {
    const { data } = await API.get(`/books/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBook = async (id, data) => {
  try {
    const res = await API.put(`/books/${id}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    await API.delete(`/books/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
