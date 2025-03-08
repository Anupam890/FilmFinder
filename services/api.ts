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
    : `${Server_api.BASE_URL}/discover/movie?sor_by=popularity.desc`

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
