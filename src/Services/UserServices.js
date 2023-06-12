import axios from "axios";

const API_HOST = "https://reqres.in/api/users";

const List = async (page) => {
  //TODO: Implement list api
  const response = await axios.get(`${API_HOST}?page=${page}`);

  return { data: response.data.data, pages: response.data.total_pages };
};

const Get = async (id) => {
  //TODO: Implement get api
  const response = await axios.get(`${API_HOST}/${id}`);

  return response.data.data;
};

const Save = async (user, id) => {
  //TODO: Implement save api

  if (id) {
    const response = await axios.post(`${API_HOST}/${id}`, user);
    return response.data;
  } else {
    const response = await axios.post(API_HOST, user);
    return response.data;
  }
};

const Delete = async (id) => {
  //TODO: Implement delete api
  const response = await axios.delete(`${API_HOST}/${id}`);

  return response.data.data;
};

export { List, Get, Save, Delete };
