import axios from "axios";

let baseUrl = "/api/persons";

export const fetchPersons = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

export const postPersons = (dataObject) => {
  return axios.post(baseUrl, dataObject).then((response) => response.data);
};

export const deletePerson = (id) => {
  axios.delete(`${baseUrl}/${id}`);
};
