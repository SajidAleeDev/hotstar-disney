import { cn } from "@/lib/utils";
import { Movie } from "@/typings";
import MovieCard from "./MovieCard";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
  title?: string;
  movies: Movie[];
  isVertical?: boolean;
  tv?: boolean;
  trending?: boolean;
};

function MoviesCarousel({ title, movies, isVertical, tv, trending }: Props) {
  return (
    <div
      className={`z-[20] ${movies.length === 0 && "hidden"}
    `}
    >
      <h2 className="text-xl font-bold px-10 pt-4">{title}</h2>

      <div
        className={cn(
          "flex space-x-4 overflow-x-scroll scrollbar-hide px-5 lg:px-10 py-5 lg:ml-[35px]",
          isVertical &&
            "space-x-0  lg:flex-row lg:space-x-4 lg:items-center flex-wrap "
        )}
      >
        {isVertical
          ? movies.map((movie, i) => (
              <Link
                className="flex flex-col  lg:flex-row lg:space-x-4 mb-10"
                key={movie.id}
                href={
                  movie.media_type === "tv"
                    ? `/tv/${movie.id}`
                    : `/movies/${movie.id}`
                }
              >
                <div className="flex flex-row space-x-4 lg:w-[350px] ">
                  <MovieCard key={movie.id} movie={movie} index={i} />
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-xl font-bold">
                      {movie.title || movie.name}
                    </h1>
                    <p className="text-sm">
                      {movie?.overview?.slice(0, 120)}...
                    </p>

                    <Button
                      // onClick={() => PlayMovie(movie.id)}
                      variant="ghost"
                      className="w-full h-[45px] flex items-center  bg-white space-x-2 text-black font-medium hover:bg-white/20 "
                      size={"icon"}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Link>
            ))
          : trending && tv
          ? movies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                tv
                index={index}
                trending
              />
            ))
          : tv
          ? movies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} tv index={index} />
            ))
          : trending
          ? movies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} trending />
            ))
          : movies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
      </div>
    </div>
  );
}

export default MoviesCarousel;
