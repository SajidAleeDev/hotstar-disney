import MoviesCarousel from "@/components/MoviesCarousel";
import SearchInput from "@/components/SearchInput";
import { TrendingMovie, TrendingTv } from "@/lib/getMovies";
import React from "react";

async function Search() {
  const TrendingMovieWeek = await TrendingMovie("week");
  const TrendingTvWeek = await TrendingTv("week");
  return (
    <main className="flex flex-col ">
      <div className="lg:p-10  flex-1 p-5 ">
        <SearchInput />
      </div>
      <div className=" flex-1 lg:pl-5  ">
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
      </div>
    </main>
  );
}

export default Search;
