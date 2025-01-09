import React, { useEffect } from "react";
import { useLanguage } from "../../theme/LanguageContext";

const Project = ({ project, data }) => {
  const projectData = data[project.id - 1];
  const { language } = useLanguage();

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

  return (
    <>
      <div className="portfolio__project">
        <div className="inner_card">
          <div className="front">
            <img src={projectData.image} alt="" />
          </div>
          <div className="back">
            <p className="title">{projectData.title}</p>
            <p className="info">{projectData.info}</p>
            <p className="desc">{projectData.desc}</p>
            <p></p>
            <div className="btn_div">
              {/* <NavLink to={"/project-details"} state={{ projectData }}>
                {language === "en" ? "View Details" : "Voir Détails"}
              </NavLink> */}

              <a
                className="btn_git"
                href={projectData.github}
                target="_blank"
                rel="noopner noreferrer"
              >
                {language === "en" ? "See Code" : "Voir Code"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
