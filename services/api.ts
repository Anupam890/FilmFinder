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
 * Firebase Function Proxy URL
 * Replace this with your actual deployed function URL.
 * Set to "" to fall back to direct TMDB (requires VPN in India).
 */
const PROXY_URL = "" as string;

/**
 * Generic fetcher for TMDB API
 * Supports both direct fetch and Firebase Function Proxy
 */
const fetchFromTMDB = async (
  endpoint: string,
  params: Record<string, string | number> = {},
) => {
  // If Proxy URL is configured, use it to bypass geo-restrictions
  if (PROXY_URL && !PROXY_URL.includes("YOUR_PROJECT_ID")) {
    try {
      const res = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint,
          params: {
            include_adult: "false",
            language: "en-US",
            page: "1",
            ...params,
          },
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          `Proxy Error (${res.status}): ${errorData.error || res.statusText}`,
        );
      }

      const data = await res.json();
      return data.results || data;
    } catch (error: any) {
      console.error(`Proxy Fetch Error at ${endpoint}:`, error);
      throw error;
    }
  }

  // Fallback to direct TMDB call (Original Method)
  // This will work globally but might require VPN in India
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
        `TMDB Error (${res.status}): ${errorData.status_message || res.statusText}`,
      );
    }

    const data = await res.json();
    return data.results || data;
  } catch (error: any) {
    console.error(`Direct Fetch API Error at ${endpoint}:`, error);
    throw error;
  }
};

export const getMovies = async ({
  query,
  page = 1,
  genreId,
}: {
  query: string;
  page?: number;
  genreId?: number;
}) => {
  if (query) {
    return fetchFromTMDB("/search/movie", { query, page });
  }
  return fetchFromTMDB("/discover/movie", {
    sort_by: "popularity.desc",
    page,
    with_genres: genreId || "",
  });
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

    // Fetch watch providers
    const watchProvidersData = await fetchFromTMDB(
      `/movie/${movieId}/watch/providers`,
    );

    // Fetch videos
    const videosData = await fetchFromTMDB(`/movie/${movieId}/videos`);

    const cast = (castData.cast || []).slice(0, 10).map((actor: any) => ({
      id: actor.id,
      name: actor.name,
      character: actor.character,
      profile_path: actor.profile_path
        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
        : null,
    }));

    return {
      ...movieData,
      cast,
      watch_providers: watchProvidersData.results || {},
      videos: videosData.results || [],
    };
  } catch (err) {
    console.error(`Error fetching movie details for ID ${movieId}:`, err);
    throw err;
  }
};

export const getActorDetails = async (actorId: string): Promise<any> => {
  return fetchFromTMDB(`/person/${actorId}`);
};

export const getActorMovies = async (actorId: string): Promise<any> => {
  const data = await fetchFromTMDB(`/person/${actorId}/movie_credits`);
  return data.cast
    .sort((a: any, b: any) => b.popularity - a.popularity)
    .slice(0, 20);
};

export const getGenres = async (): Promise<any> => {
  const data = await fetchFromTMDB("/genre/movie/list");
  return data.genres;
};

export const getTrendingPeople = async (): Promise<any> => {
  try {
    const data = await fetchFromTMDB("/trending/person/day");
    const results = Array.isArray(data) ? data : data?.results || [];
    return Array.isArray(results) ? results.slice(0, 10) : [];
  } catch (err) {
    console.error("Error in getTrendingPeople:", err);
    return [];
  }
};
