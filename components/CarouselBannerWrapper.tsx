import CarouselBanner from "@/components/CarouselBanner";

import { Movie } from "@/typings";

type Props = {
  id?: string;
  keywords?: string;
};

async function CarouselBannerWrapper({
  movies,
  tv,
}: {
  movies: Movie[];
  tv?: boolean;
}) {
  return <CarouselBanner movies={movies} tv={tv!} />;
}

export default CarouselBannerWrapper;
