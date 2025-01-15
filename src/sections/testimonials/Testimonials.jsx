import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination } from "swiper/modules";
import testimonialsEn from "./data";
import testimonialsFr from "./data_fr";
import Testimonial from "./Testimonial";
import "./testimonials.css";
import { useLanguage } from "../../theme/LanguageContext";
import "magic.css/dist/magic.min.css";
import useVisibility from "../../hooks/useVisibility";

const Testimonials = () => {
  const { language } = useLanguage();
  const ref = useRef();
  const isVisible = useVisibility(ref);

  return (
    <section id="testimonials" ref={ref}>
      {/* <h2 className={`${isVisible ? "magictime slideLeftReturn" : "none"} `}>
        {language === "en"
          ? "What My Clients and Colleagues Have to Say"
          : "Les témoignages de mes clients et collègues"}
      </h2> */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          600: { slidesPerView: 1 },
          700: { slidesPerView: 1 },
          1025: { slidesPerView: 2 },
        }}
        modules={[Pagination, Autoplay]}
        autoplay={true}
        className={`mySwiper ${isVisible ? "magicTimeLeftReturn" : "none"}`}
      >
        {language === "en"
          ? testimonialsEn.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <Testimonial testimonial={testimonial} />
              </SwiperSlide>
            ))
          : testimonialsFr.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <Testimonial testimonial={testimonial} />
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
