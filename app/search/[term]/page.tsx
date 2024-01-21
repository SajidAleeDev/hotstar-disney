import MoviesCarousel from "@/components/MoviesCarousel";
import SearchInput from "@/components/SearchInput";
import { getSearch, getDiscoverMovie } from "@/lib/getMovies";
import { notFound } from "next/navigation";

type Props = {
  params: {
    term: string;
  };
};

async function SearchPage({ params: { term } }: Props) {
  if (!term) notFound();

  const termToUse = decodeURI(term);
  const movies = await getSearch(termToUse);

  const popularMovies = await getDiscoverMovie();

  return (
    <main className="flex flex-col ">
      <div className="lg:p-10  flex-1 p-5 ">
        <SearchInput />
      </div>
      <div className="lg:pl-10 ">
        <MoviesCarousel title="Top Results" movies={movies} isVertical />

        <MoviesCarousel title="You may also like" movies={popularMovies} />
      </div>
    </main>
  );
}

export default SearchPage;
