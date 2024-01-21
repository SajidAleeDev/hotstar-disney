"use client";

import { gerne } from "@/lib/gerne";
import getImagePath from "@/lib/getImagePath";
import { language } from "@/lib/language";
import { Movie } from "@/typings";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";

Autoplay.globalOptions = { delay: 8000, stopOnMouseEnter: true };
function CarouselBanner({ movies, tv }: { movies: Movie[]; tv: boolean }) {
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    loop: true,
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "trimSnaps",
    loop: true,
    container: ".embla__container",
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <>
      <div
        className="overflow-hidden  relative cursor-pointer  flex-1
    "
        ref={emblaMainRef}
      >
        <div className="flex">
          {movies?.map((movie) => {
            if (movie.media_type === "tv") {
              tv = true;
            } else {
              tv = false;
            }
            return (
              <Link
                key={movie.id}
                className={`flex-full min-w-0  relative z-[30]
                        ${movie.backdrop_path === null && "hidden"}
                `}
                href={tv ? `/tv/${movie.id}` : `/movies/${movie.id}`}
              >
                <Image
                  key={movie.id}
                  src={getImagePath(
                    movie.backdrop_path || movie.poster_path,
                    true
                  )}
                  alt={movie.title}
                  width={1920}
                  height={1080}
                  style={{ filter: "brightness(0.7)" }}
                  className="hidden lg:inline"
                />
                <Image
                  key={movie.id}
                  src={getImagePath(
                    movie.poster_path || movie.backdrop_path,
                    true
                  )}
                  alt={movie.title}
                  width={1920}
                  height={1080}
                  style={{ filter: "brightness(0.7)" }}
                  className="lg:hidden h-screen"
                />

                <div className="hidden lg:inline absolute mt-0 top-0 pt-[13rem]  left-0  bg-transparent z-[300] h-full w-full bg-gradient-to-r from-gray-900/50 via-transparent to-transparent p-10 space-y-5 text-white  pl-20">
                  <h2 className="text-5xl font-bold max-w-xl ">
                    {movie.title || movie.name}
                  </h2>
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
                              (lang) =>
                                lang.iso_639_1 === movie.original_language
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
                  {gerne.map((item) => {
                    if (movie.genre_ids.includes(item.id)) {
                      return (
                        <span
                          key={item.id}
                          className="inline-block px-2 mx-2 py-1 text-xs font-medium text-white bg-slate-400/50 rounded-md"
                        >
                          {item.name}
                        </span>
                      );
                    }
                  })}
                  <div className="flex space-x-2 items-center">
                    <Button
                      // onClick={() => PlayMovie(movie.id)}
                      variant="ghost"
                      className="w-[350px] h-[45px] flex items-center  bg-white space-x-2 text-black font-medium hover:bg-white/20 "
                      size={"icon"}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <XCircle
          onClick={() => setOfficalTrailer(undefined)}
          className={`absolute right-[50%] top-0 m-5 cursor-pointer z[200] 
           ${officalTrailer === undefined ? "hidden" : " hidden lg:block"}
          `}
          size={40}
        />

        <div
          className={`${
            officalTrailer !== undefined ? "hidden" : " hidden lg:flex"
          } space-x-2 items-center  z-[20] absolute right-0 bottom-0 overflow-x-hidden bg-transparent w-[70%] justify-end scrollbar-hide `}
          ref={emblaThumbsRef}
        >
          <div className="flex pl-2 space-x-2 items-center ">
            {movies.slice(0, 8 + selectedIndex).map((movie, index) => (
              <div
                key={movie.id}
                className={` w-[100px] flex-1 relative cursor-pointer  mb-[10px] rounded-lg 
               ${index === selectedIndex ? "border-2 border-white" : ""}
               
               ${movie.backdrop_path === null && "hidden"}
               `}
                onClick={() => {
                  onThumbClick(index);
                }}
              >
                <Image
                  src={getImagePath(
                    movie.poster_path || movie.backdrop_path,

                    true
                  )}
                  alt={movie.title}
                  width={300}
                  height={1080}
                  className="object-cover rounded-md "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CarouselBanner;
