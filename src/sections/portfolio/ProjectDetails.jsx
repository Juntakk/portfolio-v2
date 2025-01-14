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

const ProjectDetails = () => {
  const { modalData } = useModalContext();
  const { language } = useLanguage();
  const [hasDemo, setHasDemo] = useState(false);

  useEffect(() => {
    if (modalData && modalData.projectData) {
      const { demo } = modalData.projectData;
      setHasDemo(demo != null && demo !== "");
    } else {
      setHasDemo(false);
    }
  }, [modalData]); // Re-run effect when modalData changes

  if (!modalData || !modalData.projectData) return null;

  const { title, info, icons, screenshots, github, demo } =
    modalData.projectData;

  return (
    <Modal className="theme__modal">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        modules={[Pagination, Autoplay]}
        autoplay={true}
        className="myDetailsSwiper"
      >
        {screenshots.map((screenshot, index) => (
          <SwiperSlide>
            <img src={screenshot} alt="" className="swiper_img" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="modal__body">
        <div className="modal__icons">
          {icons.map(([icon, name], index) => (
            <div key={index} className="icon">
              {icon}
              <span>{name}</span>
            </div>
          ))}
        </div>
        <div className="modal__text">
          <h1 className="modal__title">{title}</h1>
          <p className="modal__info">{info}</p>
        </div>
      </div>
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
    </Modal>
  );
};

export default ProjectDetails;
