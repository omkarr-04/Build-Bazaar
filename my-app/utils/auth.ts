import api from "./api";

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
    

    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Login failed";
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    return null;
  }
};
