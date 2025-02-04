import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Project from "./Project";
import "./styles/projects.css";

const Projects = ({ projects, data }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.activeIndex);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="portfolio__projects">
      {isMobile ? (
        <>
          <p className="slideNumber">
            {activeSlide + 1} / {projects.length}
          </p>
          <Swiper
            className="portfolio__swiper"
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            spaceBetween={2}
            slidesPerView={1}
            onSlideChange={handleSlideChange}
          >
            {projects.map((project) => (
              <>
                <SwiperSlide key={project.id}>
                  <Project key={project.id} project={project} data={data} />
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </>
      ) : (
        projects.map((project) => (
          <Project key={project.id} project={project} data={data} />
        ))
      )}
    </div>
  );
};

export default Projects;
