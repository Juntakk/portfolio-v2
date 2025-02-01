import { useState, useEffect } from "react";
import CategoryButton from "./CategoryButton";
import React from "react";
import "./styles/project-categories.css";
import { useLanguage } from "../../theme/LanguageContext";

const ProjectsCategories = ({ categories, onFilterProjects }) => {
  const language = useLanguage();
  const [activeCategory, setActiveCategory] = useState(
    language === "en" ? "All" : "Tout"
  );

  useEffect(() => {
    onFilterProjects(activeCategory);
  }, [activeCategory, onFilterProjects]);

  const changeCategoryHandler = (activeCat) => {
    setTimeout(() => {
      setActiveCategory(activeCat);
      onFilterProjects(activeCat);
    }, 200);
  };
  return (
    <div
      className="portfolio__categories"
      data-aos="fade-left"
      data-aos-duration="2000"
    >
      {categories.map((category) => (
        <CategoryButton
          key={category}
          category={category}
          onChangeCategory={() => changeCategoryHandler(category)}
          className={`cat__btn hover-this ${
            activeCategory === category ? "active" : ""
          }`}
        />
      ))}
    </div>
  );
};

export default ProjectsCategories;
