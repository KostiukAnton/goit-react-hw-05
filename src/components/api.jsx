import axios from "axios";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTU3ZTVkMzkyOTEyNDE2NTMyOGY1MmM2M2MzMGRhMiIsIm5iZiI6MTc0MTg5NTA3MC41LCJzdWIiOiI2N2QzMzU5ZTcwNWQ2ODMxMTczZTBhNTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-gRspPjzu5_XarpK4Ln6y_FsnkoG0Anhtruk6Lk8Duo",
  },
};
const url = "https://api.themoviedb.org/3";

export async function fetchTrendingMovies() {
  const response = await axios.get(
    `${url}/trending/movie/day?language=en-US`,
    options
  );
  return response.data.results;
}

export async function searchMovies(query) {
  const response = await axios.get(
    `${url}/search/movie?include_adult=false&language=en-US&page=1&query=${query}`,
    options
  );
  return response.data.results;
}

export async function fetchMovieDetails(movieId) {
  const response = await axios.get(
    `${url}/movie/${movieId}?language=en-US`,
    options
  );
  return response.data;
}

export async function fetchMovieCast(movieId) {
  const response = await axios.get(
    `${url}/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data.cast;
}

export async function fetchMovieReviews(movieId) {
  const response = await axios.get(
    `${url}/movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return response.data.results;
}
