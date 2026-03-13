import axios from "axios";

const API = "http://localhost:5000/api/movies";

export const fetchMovies = async (data) => {
  const res = await axios.post(`${API}/suggest`, data);
  return res.data;
};

export const fetchNextMovies = async () => {
  const res = await axios.get(`${API}/next`);
  return res.data;
};