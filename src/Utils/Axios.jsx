import axios from "axios";

const instance = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWY1NTkxNzBlMGM3NDMwYmEwNWZiNzRiODlkOTAxYSIsIm5iZiI6MTcyNTQ0MDM0OC43OTc2NDEsInN1YiI6IjY2ZDgxZGJkNmMyMGZjOTNiZDlkODI2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vqbYdULcgPCxih4P2iO-AqOC4hhQ7VhajBVzU5nrleQ",
  },
});

export default instance;
