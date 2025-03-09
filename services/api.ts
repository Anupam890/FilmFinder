export const Server_api = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const getMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${Server_api.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${Server_api.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: Server_api.headers,
  });

  if (!res.ok) {
    //@ts-ignore
    throw new Error("Failed to fetch movies", res.statusText);
  }

  const data = await res.json();
  return data.results;
};

export const getMovieDetails = async (movieId: string): Promise<any> => {
  try {
    const movieRes = await fetch(
      `${Server_api.BASE_URL}/movie/${movieId}?api_key=${Server_api.API_KEY}`,
      {
        method: "GET",
        headers: Server_api.headers,
      }
    );

    const castRes = await fetch(
      `${Server_api.BASE_URL}/movie/${movieId}/credits?api_key=${Server_api.API_KEY}`,
      {
        method: "GET",
        headers: Server_api.headers,
      }
    );

    if (!movieRes.ok || !castRes.ok) {
      throw new Error("Failed to fetch movie details or cast");
    }

    const movieData = await movieRes.json();
    const castData = await castRes.json();

    const formattedCast = castData.cast.map((actor: any) => ({
      id: actor.id,
      name: actor.name,
      character: actor.character,
      profile_path: actor.profile_path
        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        : null,
    }));
    return { ...movieData, cast: formattedCast };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
