import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import MoviesCarousel from "@/components/MoviesCarousel";
import {
  TrendingMovie,
  getDiscoverMovie,
  getNowPlayingMovie,
  getPopularMovie,
  getTopRatedMovie,
  getUpcomingMovie,
} from "@/lib/getMovies";

async function Movies() {
  const movies = await getDiscoverMovie();
  const upcomingMovies = await getUpcomingMovie();
  const TrandingThisWeek = await TrendingMovie("week");
  const TrandingToday = await TrendingMovie("day");
  const NowPlaying = await getNowPlayingMovie();
  const Popular = await getPopularMovie();
  const TopRated = await getTopRatedMovie();

  return (
    <main className="">
      <CarouselBannerWrapper movies={movies} />
      <div className="flex flex-col space-y-2 lg:ml-8">
        <MoviesCarousel movies={upcomingMovies} title="Latest Releases" />
        <MoviesCarousel movies={NowPlaying} title="Now Playing" />
        <MoviesCarousel
          movies={TrandingToday}
          title="Tranding Today"
          trending
        />
        <MoviesCarousel
          movies={TrandingThisWeek}
          title="Tranding This Week"
          trending
        />
        <MoviesCarousel movies={Popular} title="Popular" />
        <MoviesCarousel movies={TopRated} title="Top Rated" />
      </div>
    </main>
  );
}

export default Movies;
