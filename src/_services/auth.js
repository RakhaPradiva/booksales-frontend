import { useJwt } from "react-jwt";
import { API } from "../_api";

export const login = async ({ email, password }) => {
  try {
    const { data } = await API.post("/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const { data } = await API.post("/register", { name, email, password });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async ({ token }) => {
  try {
    const { data } = await API.post(
      "/logout",
      { token },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      },
    );
    localStorage.removeItem("access-token");

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useDecodeToken = (token) => {
  const { decodedToken, isExpired } = useJwt(token);

  try {
    if (isExpired) {
      return { success: true, message: "Token Expired", data: null };
    }

    return {
      success: true,
      message: "Valid Token",
      data: decodedToken,
    };
  } catch (error) {
    return {
      success: false,
      message: error.messsage,
      data: null,
    };
  }
};
