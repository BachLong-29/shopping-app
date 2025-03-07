import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <Carousel className="relative w-full max-w-[1472px] max-h-[450px] mx-auto">
      <CarouselContent>
        {[1, 2, 3, 4].map((i) => (
          <CarouselItem key={i} className="h-[450px]">
            <Image
              src={`/banner/banner${i}.jpg`}
              alt="Banner"
              width={1472}
              height={450}
              className="rounded-xl w-full h-full "
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-[25px]" />
      <CarouselNext className="absolute right-[25px]" />
    </Carousel>
  );
};

export default Banner;
