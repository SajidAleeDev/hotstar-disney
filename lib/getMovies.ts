import { MovieDetails, MoviesVideo, SearchResults, TvDetails } from "@/typings";
import { TMDB_API_KEY } from "./keys";

async function fetchFromTMDB(url: URL, cacheTime?: number) {
  // url.searchParams.set("include_adult", "true");

  url.searchParams.set("page", "4");

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24,
    },
  };

  const response = await fetch(url.toString(), options);
  const data = await response.json();
  return data;
}

export async function getDiscoverMovie(id?: string, keywords?: string) {
  const url = new URL(`https://api.themoviedb.org/3/discover/movie`);

  keywords && url.searchParams.set("with_keywords", keywords);
  id && url.searchParams.set("with_genres", id);

  const data = (await fetchFromTMDB(url)) as SearchResults;
  return data.results;
}
export async function getDiscoverTv(id?: string, keywords?: string) {
  const url = new URL(`https://api.themoviedb.org/3/discover/tv`);

  keywords && url.searchParams.set("with_keywords", keywords);
  id && url.searchParams.set("with_genres", id);

  const data = (await fetchFromTMDB(url)) as SearchResults;
  return data.results;
}

export async function getUpcomingMovie() {
  const url = new URL("https://api.themoviedb.org/3/movie/upcoming");

  const data = (await fetchFromTMDB(url)) as SearchResults;
  return data.results;
}
export async function getUpcomingTv() {
  const url = new URL("https://api.themoviedb.org/3/tv/airing_today");

  const data = (await fetchFromTMDB(url)) as SearchResults;

  return data.results;
}

export async function Trending(time_window: "day" | "week") {
  const url = new URL(
    `
    https://api.themoviedb.org/3/trending/all/${time_window}`
  );
  const data = (await fetchFromTMDB(url)) as SearchResults;

  return data.results;
}
export async function TrendingMovie(time_window: "day" | "week") {
  const url = new URL(
    `
    https://api.themoviedb.org/3/trending/movie/${time_window}`
  );
  const data = (await fetchFromTMDB(url)) as SearchResults;

  return data.results;
}
export async function TrendingTv(time_window: "day" | "week") {
  const url = new URL(
    `
    https://api.themoviedb.org/3/trending/tv/${time_window}`
  );
  const data = (await fetchFromTMDB(url)) as SearchResults;

  return data.results;
}

export async function getNowPlayingMovie() {
  const url = new URL("https://api.themoviedb.org/3/movie/now_playing");
  const data = (await fetchFromTMDB(url)) as SearchResults;

  return data.results;
}
export async function getNowPlayingTv() {
  const url = new URL("https://api.themoviedb.org/3/tv/on_the_air");
  const data = (await fetchFromTMDB(url)) as SearchResults;

  return data.results;
}

export async function getPopularMovie() {
  const url = new URL("https://api.themoviedb.org/3/movie/popular");
  const data = (await fetchFromTMDB(url)) as SearchResults;

  return data.results;
}
export async function getPopularTv() {
  const url = new URL("https://api.themoviedb.org/3/tv/popular");
  const data = (await fetchFromTMDB(url)) as SearchResults;

  return data.results;
}

export async function getTopRatedMovie() {
  const url = new URL("https://api.themoviedb.org/3/movie/top_rated");
  const data = (await fetchFromTMDB(url)) as SearchResults;

  return data.results;
}
export async function getTopRatedTv() {
  const url = new URL("https://api.themoviedb.org/3/tv/top_rated");
  const data = (await fetchFromTMDB(url)) as SearchResults;

  return data.results;
}

export async function getPlayMovieTrailer(id: number) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}/videos`);

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  };

  const response = await fetch(url.toString(), options);
  const data = (await response.json()) as MoviesVideo;

  return data.results;
}

export async function getPlayTvTrailer(id: number) {
  const tv = new URL(`https://api.themoviedb.org/3/tv/${id}/videos`);

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  };

  const response = await fetch(tv.toString(), options);
  const data = (await response.json()) as MoviesVideo;

  return data.results;
}

export async function getMovieDetails(id: number) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  };

  const response = await fetch(url.toString(), options);

  const data = (await response.json()) as MovieDetails;

  return data;
}

export async function getTvDetails(id: number) {
  const url = new URL(`https://api.themoviedb.org/3/tv/${id}`);
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  };

  const response = await fetch(url.toString(), options);
  const data = (await response.json()) as TvDetails;

  return data;
}
export async function getRecommendationsTv(id: number) {
  const url = new URL(`https://api.themoviedb.org/3/tv/${id}/recommendations`);

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  };

  const response = await fetch(url.toString(), options);

  const data = (await response.json()) as SearchResults;

  return data.results;
}

export async function getMoreLikeThisTv(id: number) {
  const url = new URL(`https://api.themoviedb.org/3/tv/${id}/similar`);

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  };

  const response = await fetch(url.toString(), options);

  const data = (await response.json()) as SearchResults;

  return data.results;
}

export async function getRecommendations(id: number) {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/${id}/recommendations`
  );

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  };

  const response = await fetch(url.toString(), options);

  const data = (await response.json()) as SearchResults;

  return data.results;
}

export async function getMoreLikeThis(id: number) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}/similar`);

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  };

  const response = await fetch(url.toString(), options);

  const data = (await response.json()) as SearchResults;

  return data.results;
}

export async function getSearch(query: string) {
  const url = new URL(`https://api.themoviedb.org/3/search/multi`);

  url.searchParams.set("query", query);
  url.searchParams.set("include_adult", "true");
  url.searchParams.set("page", "1");

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  };

  const response = await fetch(url.toString(), options);

  const data = (await response.json()) as SearchResults;

  return data.results;
}
