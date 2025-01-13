import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import "../../index.css";
import { useModalContext } from "../../context/modal-context";
import "./styles/project-details.css";
import { useLanguage } from "../../theme/LanguageContext";

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

  const { title, info, icons, image, github, demo } = modalData.projectData;

  return (
    <Modal className="theme__modal">
      <div className="modal__image-container">
        <img src={image} alt={title} className="modal__image" />
      </div>
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
