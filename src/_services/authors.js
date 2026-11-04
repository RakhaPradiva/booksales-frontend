import { API } from "../_api";

export const getAuthors = async () => {
  try {
    const { data } = await API.get("/authors");
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
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

export const showAuthor = async (id) => {
  try {
    const { data } = await API.get(`/authors/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateAuthor = async (id, data) => {
  try {
    const res = await API.put(`/authors/${id}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAuthor = async (id) => {
  try {
    await API.delete(`/authors/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
