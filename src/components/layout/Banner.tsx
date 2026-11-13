"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/effect-fade";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";
import { useGetAllBanners } from "@/hooks/useBanner";
import { IGetBanner } from "@/types/banner.type";

const Banner = () => {
  const { data } = useGetAllBanners();

  const slides = data.data || [];

  if (slides.length === 0) {
    return <div>No banners available</div>;
  }

  return (
    <div className="relative w-full h-145 md:h-170">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: false,
          renderBullet: (_, className) =>
            `<span class="${className} bg-white! opacity-60! [&.swiper-pagination-bullet-active]:opacity-100! w-2! h-2! rounded-full! transition-all"></span>`,
        }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide: IGetBanner) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide?.imageUrl})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/55" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                  {/* Title */}
                  <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-4">
                    {slide?.title}{" "}
                  </h1>

                  {/* Description */}
                  <p className="text-white/75 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
                    {slide?.subtitle}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button asChild size="lg" className="gap-2">
                      <Link href={`/${slide?.ctaLink}`}>
                        {slide?.ctaText}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
