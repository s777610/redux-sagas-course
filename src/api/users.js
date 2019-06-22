import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://rem-rest-api.herokuapp.com/api";

export const getUsers = () => {
  return axios.get("/users", {
    params: { limit: 1000 }
  });
};

export const createUser = ({ firstName, lastName }) => {
  return axios.post("/users", {
    firstName,
    lastName
  });
};

export const deleteUser = ({ userId }) => {
  console.log("api deleteUser", userId);
  return axios.delete(`/users/${userId}`);
};
