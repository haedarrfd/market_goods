"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  { imgUrl: "/assets/images/hero-1.svg", alt: "Smartwatch" },
  { imgUrl: "/assets/images/hero-2.svg", alt: "Bag" },
  { imgUrl: "/assets/images/hero-3.svg", alt: "Lamp" },
  { imgUrl: "/assets/images/hero-4.svg", alt: "Air Fryer" },
  { imgUrl: "/assets/images/hero-5.svg", alt: "Chair" },
];

const HeroCarousel = () => {
  return (
    <div className="hero_carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <Image
            key={image.alt}
            src={image.imgUrl}
            alt={image.alt}
            width={485}
            height={485}
            className="object-contain"
          />
        ))}
      </Carousel>

      <Image
        src="/assets/icons/hand-drawn-arrow.svg"
        alt="Hand drawn"
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[18%] bottom-0 z-0"
      />
    </div>
  );
};

export default HeroCarousel;
