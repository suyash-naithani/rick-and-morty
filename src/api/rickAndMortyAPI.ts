import axios from "axios";

const API_BASE = "https://rickandmortyapi.com/api";

const rickAndMortyAPI = {
  // Fetches a list of characters
  fetchCharacters: (page: number = 1) => {
    return axios.get(`${API_BASE}/character?page=${page}`);
  },

  // Fetches a single character by ID
  fetchCharacterById: (id: number) => {
    return axios.get(`${API_BASE}/character/${id}`);
  },

  searchCharactersByName: (name: string, page: number = 1) => {
    return axios.get(`${API_BASE}/character?name=${name}&page=${page}`);
  },
};

export default rickAndMortyAPI;
