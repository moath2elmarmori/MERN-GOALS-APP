import axios from "axios";

// const API_URL = "http://localhost:5000/api/users";
const API_URL = "https://goalsetter-moath.onrender.com/api/users";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
