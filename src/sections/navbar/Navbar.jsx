import React from "react";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useLanguage } from "../../theme/LanguageContext";
import LanguageToggle from "../../theme/LanguageToggle";
import { LiaCloudDownloadAltSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import CV_fr from "../../assets/NicolasGauthier_DEV_fr.pdf";
import CV_en from "../../assets/NicolasGauthier_DEV.pdf";
import data_en from "./data";
import data_fr from "./data_fr";
import "./navbar.css";
import { useThemeContext } from "../../context/theme-context";

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const { language } = useLanguage();
  const data = language === "en" ? data_en : data_fr;
  const [activeSection, setActiveSection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { themeState } = useThemeContext();

  useEffect(() => {
    if (activeSection) {
      setCompleted(false);
      const timer = setTimeout(() => setCompleted(true), 750);
      return () => clearTimeout(timer);
    }
  }, [activeSection]);

  //Mobile state
  useEffect(() => {
    setIsMobile(window.innerWidth < 1025);
    setIsOpen(isMobile);
  }, [isMobile]);

  //Section tracker
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsOpen(isHovered);
  }, [isHovered]);

  return (
    <nav
    // onMouseEnter={!isMobile ? () => setIsHovered(true) : null}
    // onMouseLeave={!isMobile ? () => setIsHovered(false) : null}
    >
      <div className={`nav__container ${isOpen ? "show" : "hide"}`}>
        <div className="nav__right">
          <button className="theme__icon hover-this" onClick={toggleTheme}>
            {isDarkMode ? <MdDarkMode /> : <MdOutlineWbSunny />}
          </button>
          <div className="line">|</div>
          <i className="nav__logo hover-this">
            <LanguageToggle />
          </i>
        </div>
        <ul className="nav__menu hover-this ">
          {data.map((item) => (
            <li key={item.id}>
              <a
                href={item.link}
                className={`${
                  activeSection === item.link.replace("#", "")
                    ? `active ${completed ? "animation-complete" : ""}`
                    : ""
                }`}
              >
                {item.title} - 0{item.id}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={language === "en" ? CV_en : CV_fr}
          download={
            language === "en"
              ? "NicolasGauthier_DEV.pdf"
              : "NicolasGauthier_DEV_fr.pdf"
          }
          className="cv hover-this"
        >
          <span className="cv__text hover-this">CV</span>{" "}
          <LiaCloudDownloadAltSolid
            color={
              themeState.primary === "color-1" ? "white" : "rgb(1, 52, 223)"
            }
          />
        </a>
      </div>
      {/* Handle */}
      <div className="nav__handle hover-this" onClick={toggleNavbar}>
        <span>
          {isOpen ? (
            <MdKeyboardDoubleArrowRight />
          ) : (
            <MdKeyboardDoubleArrowLeft />
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
