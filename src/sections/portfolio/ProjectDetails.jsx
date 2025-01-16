import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import "../../index.css";
import { useModalContext } from "../../context/modal-context";
import "./styles/project-details.css";
import { useLanguage } from "../../theme/LanguageContext";
import { RxCross1 } from "react-icons/rx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const ProjectDetails = () => {
  const { modalData, closeModalHandler } = useModalContext();
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

  const { title, info, icons, screenShot, github, demo } =
    modalData.projectData;

  return (
    <Modal className="theme__modal">
      <Swiper
        className="modal__image-container"
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 2500,
        }}
        loop={true}
      >
        {screenShot.map((item, key) => (
          <SwiperSlide>
            <img
              src={item}
              alt={title}
              className="modal__image"
              onClick={() => window.open(github, "_blank")}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="modal__body">
        <div className="modal__text">
          <h1 className="modal__title">{title}</h1>
          <p className="modal__info">{info}</p>
        </div>
        <div className="modal__icons">
          {icons.map(([icon, name], index) => (
            <div key={index} className="icon">
              {icon}
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="btn__container">
        <button
          className="git__btn"
          onClick={() => window.open(github, "_blank")}
        >
          {language === "en" ? "See more" : "Voir plus"}
        </button>
        {hasDemo && (
          <button
            className="git__btn"
            onClick={() => window.open(demo, "_blank")}
          >
            Demo{" "}
          </button>
        )}
        <span onClick={closeModalHandler}>
          <RxCross1 />
        </span>
      </div>
    </Modal>
  );
};

export default ProjectDetails;
