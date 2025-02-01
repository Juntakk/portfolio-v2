import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import "../../index.css";
import { useModalContext } from "../../context/modal-context";
import "./styles/project-details.css";
import { useLanguage } from "../../theme/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { RxCross1 } from "react-icons/rx";

const ProjectDetails = () => {
  const { modalData, closeModalHandler } = useModalContext();
  const [hasDemo, setHasDemo] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModalHandler();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeModalHandler]);

  useEffect(() => {
    if (modalData && modalData.projectData) {
      const { demo } = modalData.projectData;
      setHasDemo(demo != null && demo !== "");
    } else {
      setHasDemo(false);
    }
  }, [modalData]);

  if (!modalData || !modalData.projectData) return null;

  const { title, info, desc, icons, screenshots, github, demo } =
    modalData.projectData;

  return (
    <Modal className="theme__modal">
<<<<<<< Updated upstream
=======
      <Swiper
        className="modal__image-container"
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 1800,
        }}
        loop={true}
      >
        {screenShot.map((item, key) => (
          <SwiperSlide>
            <img
              src={item}
              alt={title}
              className="modal__image"
              onClick={() => window.open(hasDemo ? demo : github, "_blank")}
            />
          </SwiperSlide>
        ))}
      </Swiper>
>>>>>>> Stashed changes
      <div className="modal__body">
        <div className="modal__text">
          <h1 className="modal__title">
            {title}{" "}
            <span className="close__btn" onClick={closeModalHandler}>
              <RxCross1 />
            </span>
          </h1>

          <p className="modal__info">{info}</p>
        </div>
<<<<<<< Updated upstream
      </div>
      <div className="swiper__container">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="myDetailsSwiper"
          loop={false}
          pagination={true}
          direction="vertical"
          lazy={{
            loadPrevNext: true,
          }}
          centeredSlides={true}
        >
          {screenshots.map((screenshot, index) => (
            <SwiperSlide>
              <img src={screenshot} alt="" className="swiper_img" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="modal__icons">
=======
        <div className="modal__icons hover-this">
>>>>>>> Stashed changes
          {icons.map(([icon, name], index) => (
            <div key={index} className="icon">
              {icon}
              <span>{name}</span>
            </div>
          ))}
        </div>
<<<<<<< Updated upstream
        <div className="btn__container">
          <button
            className="git__btn"
            onClick={() => window.open(github, "_blank")}
          >
            {language === "en" ? "See code" : "Voir code"}
          </button>
          {hasDemo && (
            <button
              className="git__btn"
              onClick={() => window.open(demo, "_blank")}
            >
              Demo{" "}
            </button>
          )}
        </div>
=======
      </div>
      <div className="btn__container">
        <button
          className="git__btn hover-this"
          onClick={() => window.open(github, "_blank")}
        >
          Code
        </button>
        {hasDemo && (
          <button
            className="git__btn hover-this"
            onClick={() => window.open(demo, "_blank")}
          >
            Demo
          </button>
        )}
        <span onClick={closeModalHandler} className="hover-this">
          <RxCross1 />
        </span>
>>>>>>> Stashed changes
      </div>
    </Modal>
  );
};
{
}

export default ProjectDetails;
