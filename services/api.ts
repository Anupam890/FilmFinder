export const Server_api = {
  BASE_URL: "https://api.themoviedb.org/3",
  get headers() {
    const token = process.env.EXPO_PUBLIC_MOVIE_API_KEY;
    if (!token) {
      console.warn(
        "TMDB API Key (EXPO_PUBLIC_MOVIE_API_KEY) is missing in environment variables!",
      );
    }
    return {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
  },
};

/**
 * Generic fetcher for TMDB API
 * @param endpoint The API endpoint (e.g., /movie/popular)
 * @param params Optional query parameters
 */
const fetchFromTMDB = async (
  endpoint: string,
  params: Record<string, string | number> = {},
) => {
  const queryParams = new URLSearchParams({
    include_adult: "false",
    language: "en-US",
    page: "1",
    ...params,
  });

  const url = `${Server_api.BASE_URL}${endpoint}?${queryParams.toString()}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: Server_api.headers,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        `TMDB Error (${res.status}): ${errorData.status_message || res.statusText || "Unknown error"}`,
      );
    }

    const data = await res.json();
    return data.results || data;
  } catch (error: any) {
    if (error.message === "Network request failed") {
      console.error(
        "Network request failed. Please check your internet connection or if the API endpoint is reachable.",
      );
    } else {
      console.error(`Fetch API Error at ${endpoint}:`, error);
    }
    throw error;
  }
};

export const getMovies = async ({
  query,
  page = 1,
}: {
  query: string;
  page?: number;
}) => {
  if (query) {
    return fetchFromTMDB("/search/movie", { query, page });
  }
  return fetchFromTMDB("/discover/movie", { sort_by: "popularity.desc", page });
};

export const getTrendingMovies = async () => {
  return fetchFromTMDB("/trending/movie/day");
};

export const getPopularMovies = async () => {
  return fetchFromTMDB("/movie/popular");
};

export const getTopRatedMovies = async () => {
  return fetchFromTMDB("/movie/top_rated");
};

export const getUpcomingMovies = async () => {
  return fetchFromTMDB("/movie/upcoming");
};

export const getMovieDetails = async (movieId: string): Promise<any> => {
  try {
    // Fetch main movie data
    const movieData = await fetchFromTMDB(`/movie/${movieId}`);

    // Fetch credits (cast) separately
    const castData = await fetchFromTMDB(`/movie/${movieId}/credits`);

    const cast = (castData.cast || []).slice(0, 10).map((actor: any) => ({
      id: actor.id,
      name: actor.name,
      character: actor.character,
      profile_path: actor.profile_path
        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
        : null,
    }));

    return { ...movieData, cast };
  } catch (err) {
    console.error(`Error fetching movie details for ID ${movieId}:`, err);
    throw err;
  }
};
