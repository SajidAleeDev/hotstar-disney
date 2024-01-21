import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import MoviesCarousel from "@/components/MoviesCarousel";
import {
  getUpcomingTv,
  getDiscoverTv,
  TrendingTv,
  getTopRatedTv,
} from "@/lib/getMovies";

async function Tv() {
  const LatestReleasesTv = await getUpcomingTv();
  const TrendingTvToday = await TrendingTv("day");
  const TrendingTvWeek = await TrendingTv("week");
  const DiscoverTv = await getDiscoverTv();
  const TopRatedTv = await getTopRatedTv();

  return (
    <main className="">
      <CarouselBannerWrapper movies={TrendingTvToday} tv />
      <div className="flex flex-col space-y-2 lg:ml-8">
        <MoviesCarousel
          movies={LatestReleasesTv}
          title="Latest Releases TV "
          tv
        />

        <MoviesCarousel
          movies={TrendingTvWeek}
          title="Trending TV "
          tv
          trending
        />
        <MoviesCarousel movies={DiscoverTv} title="Discover TV " tv />
        <MoviesCarousel movies={TopRatedTv} title="Top Rated TV " tv />
      </div>
    </main>
  );
}

export default Tv;
