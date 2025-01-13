import React, { useEffect } from "react";
import { useLanguage } from "../../theme/LanguageContext";
import { useModalContext } from "../../context/modal-context";
import { useThemeContext } from "../../context/theme-context";

import "./styles/project.css";

const Project = ({ project, data }) => {
  const projectData = data[project.id - 1];
  const { language } = useLanguage();
  const { showModalHandler } = useModalContext();
  const { themeState } = useThemeContext();

  useEffect(() => {
    const toggleCardFlip = (event) => {
      const project = event.currentTarget;
      const innerCard = project.querySelector(".inner_card");
      if (innerCard) {
        innerCard.classList.toggle("flipped");
      }
    };

    const projects = document.querySelectorAll(".portfolio__project");
    projects.forEach((project) => {
      project.addEventListener("click", toggleCardFlip);
    });

    return () => {
      projects.forEach((project) => {
        project.removeEventListener("click", toggleCardFlip);
      });
    };
  }, []);

  const openModal = () => {
    showModalHandler({ projectData, themeState });
    console.log(projectData);
  };
  return (
    <>
      <div className="portfolio__project">
        <div className="inner_card">
          <div className="front">
            <img src={projectData.image} alt="" />
          </div>
          <div className="back" onClick={openModal}>
            <p className="title">{projectData.title}</p>
            <div className="btn_div">
              <a
                className="btn_git"
                target="_blank"
                rel="noopner noreferrer"
                onClick={openModal}
              >
                {language === "en" ? "KNOW MORE" : "VOIR PLUS"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
