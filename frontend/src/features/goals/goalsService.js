import axios from "axios";

const API_URL = "http://localhost:5000/api/goals";

const getGoals = async (token) => {
  // the configuration object that will be sent to all kinds of request for goals because it has the authorization header that is equal to "Bearer <token>"
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const postGoal = async (goalData, token) => {
  // the configuration object that will be sent to all kinds of request for goals because it has the authorization header that is equal to "Bearer <token>"
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, goalData, config);
  return response.data;
};

const editGoal = async (goalId, goalData, token) => {
  // the configuration object that will be sent to all kinds of request for goals because it has the authorization header that is equal to "Bearer <token>"
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${goalId}`, goalData, config);
  return response.data;
};

const deleteGoal = async (goalId, token) => {
  // the configuration object that will be sent to all kinds of request for goals because it has the authorization header that is equal to "Bearer <token>"
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${goalId}`, config);
  return response.data;
};

const goalsService = {
  getGoals,
  postGoal,
  editGoal,
  deleteGoal,
};

export default goalsService;
