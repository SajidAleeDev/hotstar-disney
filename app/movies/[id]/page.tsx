"use client";
import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import getImagePath from "@/lib/getImagePath";
import {
  getMoreLikeThis,
  getMovieDetails,
  getPlayMovieTrailer,
  getRecommendations,
} from "@/lib/getMovies";
import { language } from "@/lib/language";
import { Movie, MovieDetails, SearchResults } from "@/typings";
import { Play } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

function MoviesIdPage({ params: { id } }: { params: { id: string } }) {
  const [officalTrailer, setOfficalTrailer] = useState<{
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
  }>();
  const [movie, setMovie] = useState<MovieDetails>();
  const [MoreLikeThis, setMoreLikeThis] = useState<Movie[]>([]);
  const [getRecommended, setgetRecommended] = useState<Movie[]>([]);
  useEffect(() => {
    getMovieDetails(parseInt(id)).then((res) => setMovie(res));
    getMoreLikeThis(parseInt(id)).then((res) => setMoreLikeThis(res));
    getRecommendations(parseInt(id)).then((res) => setgetRecommended(res));
  }, [id]);
  if (movie === undefined) return null;

  const PlayMovie = (id: number) => {
    getPlayMovieTrailer(id).then((res) => {
      res.find((item) => {
        if (
          item.official === true &&
          item.site === "YouTube" &&
          item.type === "Trailer"
        ) {
          setOfficalTrailer(item);
        } else if (item.site === "YouTube" && item.type === "Trailer") {
          setOfficalTrailer(item);
        }
      });
    });
  };

  return (
    <>
      <div
        key={movie.id}
        className={`flex-full min-w-0  relative z-[30] lg:mb-4
    `}
      >
        {officalTrailer === undefined ? (
          <>
            <Image
              key={movie.id}
              src={getImagePath(movie.backdrop_path || movie.poster_path, true)}
              alt={movie.title}
              width={1920}
              height={1080}
              style={{ filter: "brightness(0.7)" }}
              className="hidden lg:inline"
            />
            <Image
              key={movie.id}
              src={getImagePath(movie.poster_path || movie.backdrop_path, true)}
              alt={movie.title}
              width={1920}
              height={1080}
              style={{ filter: "brightness(0.7)" }}
              className="lg:hidden  object-cover"
            />

            <div className="hidden lg:inline absolute mt-0 top-0 pt-[13rem]  left-0  bg-transparent z-[300] h-full w-full bg-gradient-to-r from-gray-900/50 via-transparent to-transparent p-10 space-y-5 text-white  pl-20">
              <h2 className="text-5xl font-bold max-w-xl ">{movie.title}</h2>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-normal">
                  {movie?.release_date?.split("-")[0]}
                </h1>
                <span className="text-xl font-normal">•</span>

                {language.find(
                  (lang) => lang.iso_639_1 === movie.original_language
                )?.name && (
                  <>
                    <h1 className="text-xl font-normal">
                      {
                        language.find(
                          (lang) => lang.iso_639_1 === movie.original_language
                        )?.english_name
                      }
                    </h1>
                    <span className="text-xl font-normal">•</span>
                  </>
                )}

                <h1
                  className={`text-xl font-normal 
       bg-slate-400/50 px-2 rounded-md
      `}
                >
                  {movie.adult ? "U/A 18+" : "U/A 13+"}
                </h1>
              </div>

              <p className="max-w-xl line-clamp-3 text-lg font-normal text-gray-300">
                {movie.overview}
              </p>

              {movie?.genres?.map((item) => {
                return (
                  <span
                    key={item.id}
                    className="inline-block px-2 mx-2 py-1 text-xs font-medium text-white bg-slate-400/50 rounded-md"
                  >
                    {item.name}
                  </span>
                );
              }, [])}

              <div className="flex space-x-2 items-center">
                <Button
                  onClick={() => PlayMovie(movie.id)}
                  variant="ghost"
                  className="w-[350px] h-[45px] flex items-center  bg-white space-x-2 text-black font-medium hover:bg-white/20 "
                  size={"icon"}
                >
                  <Play />
                  Play Trailer
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div key={movie.id} className="flex-full  z-[200]">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${officalTrailer?.key}`}
                width={"100%"}
                controls
                height={"90vh"}
                onDisablePIP={() => setOfficalTrailer(undefined)}
                onEnded={() => setOfficalTrailer(undefined)}
                volume={0.5}
              />
            </div>
          </>
        )}
      </div>
      <div className={`w-full pb-[20px]  bg-gray-900/90  lg:p-20  lg:hidden `}>
        <div className="p-10 space-y-4">
          <h2 className="text-5xl font-bold max-w-xl text-center ">
            {movie.title}
          </h2>
          <div className="flex items-center space-x-2 justify-center ">
            <h1 className="text-lg font-normal">
              {movie?.release_date?.split("-")[0]}
            </h1>
            <span className="text-lg font-normal">•</span>

            {language.find((lang) => lang.iso_639_1 === movie.original_language)
              ?.name && (
              <>
                <h1 className="text-lg font-normal">
                  {
                    language.find(
                      (lang) => lang.iso_639_1 === movie.original_language
                    )?.english_name
                  }
                </h1>
                <span className="text-xl font-normal">•</span>
              </>
            )}

            <h1
              className={`text-lg font-normal 
       bg-slate-400/50 px-1 rounded-md
        `}
            >
              {movie.adult ? "U/A 18+" : "U/A 13+"}
            </h1>
          </div>

          <p className="max-w-xl line-clamp-3 text-sm font-normal text-gray-300 text-center">
            {movie.overview}
          </p>

          <div className={`flex space-x-2 items-center justify-center`}>
            {movie?.genres?.map((item) => {
              return (
                <span
                  key={item.id}
                  className="inline-block px-2 mx-2 py-1 text-xs font-medium text-white bg-slate-400/50 rounded-md"
                >
                  {item.name}
                </span>
              );
            }, [])}
          </div>
          <div className={`flex space-x-2 items-center justify-center mt-5`}>
            <Button
              variant="ghost"
              onClick={() => PlayMovie(movie.id)}
              className="w-full h-[45px] flex items-center  bg-white space-x-2 text-black font-medium hover:bg-white/20 "
            >
              <Play />
              Play Trailer
            </Button>
          </div>
        </div>
        <h1
          className={`text-2xl font-bold px-10 py-4 text-white w-full text-center
            
          ${getRecommended.length === 0 ? "hidden" : ` inline`}
             `}
        >
          More Like This
        </h1>
        <div
          className={`flex space-x-4 overflow-x-scroll scrollbar-hide px-5 py-3 `}
        >
          {getRecommended.map((item, index) => (
            <MovieCard key={item.id} movie={item} tv={false} index={index} />
          ))}
        </div>
        <h1
          className={`text-2xl font-bold px-10 py-4 text-white w-full text-center `}
        >
          Suggestions
        </h1>
        <div
          className={`flex space-x-4 overflow-x-scroll scrollbar-hide px-5 `}
        >
          {MoreLikeThis.map((item, index) => (
            <MovieCard key={item.id} movie={item} tv={false} index={index} />
          ))}
        </div>
      </div>

      <h2
        className={`text-xl font-bold px-10 pt-4 ml-7  ${
          getRecommended.length === 0 ? "hidden" : `hidden lg:inline`
        } `}
      >
        {"More Like This"}
      </h2>
      <div
        className={
          " space-x-4 overflow-x-scroll scrollbar-hide px-5 lg:px-10 py-5 lg:ml-[35px] hidden lg:flex"
        }
      >
        {getRecommended.map((item, index) => (
          <MovieCard key={item.id} movie={item} tv={false} index={index} />
        ))}
      </div>

      <h2
        className="text-xl font-bold px-10 pt-4 ml-7
       hidden lg:inline
      "
      >
        {"Suggestions"}
      </h2>
      <div className=" space-x-4 overflow-x-scroll scrollbar-hide px-5 lg:px-10 py-5 lg:ml-[35px] hidden lg:flex">
        {MoreLikeThis.map((item, index) => (
          <MovieCard key={item.id} movie={item} tv={false} index={index} />
        ))}
      </div>
    </>
  );
}

export default MoviesIdPage;
