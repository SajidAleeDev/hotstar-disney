import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import MoviesCarousel from "@/components/MoviesCarousel";
import {
  Trending,
  getUpcomingMovie,
  getUpcomingTv,
  getDiscoverMovie,
  getDiscoverTv,
  TrendingMovie,
  TrendingTv,
  getPopularMovie,
  getPopularTv,
  getTopRatedMovie,
  getTopRatedTv,
} from "@/lib/getMovies";

export default async function Home() {
  const movies = await Trending("day");
  const LatestReleasesMovies = await getUpcomingMovie();
  const LatestReleasesTv = await getUpcomingTv();
  const TrendingMovieToday = await TrendingMovie("day");
  const TrendingTvToday = await TrendingTv("day");
  const TrendingMovieWeek = await TrendingMovie("week");
  const TrendingTvWeek = await TrendingTv("week");
  const DiscoverMovie = await getDiscoverMovie();
  const DiscoverTv = await getDiscoverTv();
  const PopularMovie = await getPopularMovie();
  const PopularTv = await getPopularTv();
  const TopRatedMovie = await getTopRatedMovie();
  const TopRatedTv = await getTopRatedTv();

  return (
    <main className="">
      <CarouselBannerWrapper movies={movies} />
      <div className="flex flex-col space-y-2 lg:ml-8">
        <MoviesCarousel
          movies={LatestReleasesMovies}
          title="Latest Releases Movies"
        />
        <MoviesCarousel
          movies={LatestReleasesTv}
          title="Latest Releases TV Shows"
          tv
        />
        <MoviesCarousel
          movies={TrendingMovieToday}
          title="Trending Movies Today"
          trending
        />
        <MoviesCarousel
          movies={TrendingTvToday}
          title="Trending TV Shows Today"
          tv
          trending
        />
        <MoviesCarousel
          movies={TrendingMovieWeek}
          title="Trending Movies This Week"
          trending
        />
        <MoviesCarousel
          movies={TrendingTvWeek}
          title="Trending TV Shows This Week"
          tv
          trending
        />
        <MoviesCarousel movies={DiscoverMovie} title="Discover Movies" />
        <MoviesCarousel movies={DiscoverTv} title="Discover TV Shows" tv />
        <MoviesCarousel movies={PopularMovie} title="Popular Movies" />
        <MoviesCarousel movies={PopularTv} title="Popular TV Shows" tv />
        <MoviesCarousel movies={TopRatedMovie} title="Top Rated Movies" />
        <MoviesCarousel movies={TopRatedTv} title="Top Rated TV Shows" tv />
      </div>
    </main>
  );
}
