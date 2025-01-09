import { useState, useEffect } from "react";
import CategoryButton from "./CategoryButton";
import React from "react";

const ProjectsCategories = ({ categories, onFilterProjects }) => {
  const [activeCategory, setActiveCategory] = useState("Web");

  useEffect(() => {
    onFilterProjects(activeCategory);
  }, [activeCategory, onFilterProjects]);

  const changeCategoryHandler = (activeCat) => {
    setActiveCategory(activeCat);
    onFilterProjects(activeCat);
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
          className={`cat__btn ${activeCategory === category ? "active" : ""}`}
        />
      ))}
    </div>
  );
};

export default ProjectsCategories;
