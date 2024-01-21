import { gerne } from "@/lib/gerne";
import getImagePath from "@/lib/getImagePath";
import { language } from "@/lib/language";
import { Movie } from "@/typings";
import Image from "next/image";
import Link from "next/link";

function MovieCard({
  movie,
  tv,
  index,
  trending,
}: {
  movie: Movie;
  tv?: boolean;
  index: number;
  trending?: boolean;
}) {
  return (
    <Link
      href={`
      ${tv ? "/tv" : "/movies"}/${movie.id}
      `}
      className={`flex-shrink-0 relative cursor-pointer transform hover:scale-105  transition duration-200 ease-out hover:drop-shadow-lg
      `}
    >
      <Image
        className={`w-[165px] h-[250px] object-cover object-center  rounded-sm 
        ${tv && "w-[190px] h-[350px] "}
        `}
        src={getImagePath(movie.poster_path || movie.backdrop_path, true)}
        alt={movie.title}
        width={1920}
        height={1080}
        key={movie.id}
      />
      {trending && (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent">
          <h1
            className={`absolute bottom-0 left-0 text-[100px] font-bold text-white p-2`}
          >
            {index + 1}
          </h1>
        </div>
      )}

      
    </Link>
  );
}

export default MovieCard;
