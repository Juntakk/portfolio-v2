import { useLanguage } from "./LanguageContext.js";
import "../sections/navbar/navbar.css";
import enImg from "../assets/uk.png";
import frImg from "../assets/france.png";
import React from "react";

const LanguageToggle = () => {
  const { toggleLanguage } = useLanguage();
  const { language } = useLanguage();

  return (
    <>
      <span onClick={toggleLanguage} className="">
        <p style={{ cursor: "pointer" }}>
          {language === "en" ? (
            <img src={enImg} alt="Switch to French" className="language-icon" />
          ) : (
            <img
              src={frImg}
              alt="Switch to English"
              className="language-icon"
            />
          )}
        </p>
      </span>
    </>
  );
};

export default LanguageToggle;
