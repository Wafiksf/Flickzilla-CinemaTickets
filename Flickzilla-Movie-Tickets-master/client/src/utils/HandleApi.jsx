import axios from "axios";

const fetchMovies = async () => {
  try {
    const response = await axios.get("http://localhost:5000/movies");
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return [];
  }
};

const fetchRandomBackdrop = async () => {
  try {
    const response = await axios.get("http://localhost:5000/movies/random");
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

const fetchUpcomingMovies = async () => {
  try {
    const response = await axios.get("http://localhost:5000/movies/upcoming");
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return [];
  }
};

const fetchTrendingMovie = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/bookedtickets");
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return [];
  }
};

export { fetchMovies, fetchRandomBackdrop, fetchUpcomingMovies, fetchTrendingMovie };
