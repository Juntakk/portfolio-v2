import { MdDarkMode } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";

import { useLanguage } from "../../theme/LanguageContext";
import LanguageToggle from "../../theme/LanguageToggle";
import { LiaCloudDownloadAltSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import CV from "../../assets/NicolasGauthier_Dev.pdf";
import data_en from "./data";
import data_fr from "./data_fr";
import "./navbar.css";
import React from "react";

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const { language } = useLanguage();
  const data = language === "en" ? data_en : data_fr;
  const [activeSection, setActiveSection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollingTimeout, setScrollingTimeout] = useState(null);

  useEffect(() => {
    let stopScrollingTimeout;

    const handleScroll = () => {
      if (!isScrolling && !scrollingTimeout) {
        const timer = setTimeout(() => {
          setIsScrolling(true);
          setScrollingTimeout(null);
        }, 500);
        setScrollingTimeout(timer);
      }

      clearTimeout(stopScrollingTimeout);

      stopScrollingTimeout = setTimeout(() => {
        setIsScrolling(false);
        clearTimeout(scrollingTimeout);
        setScrollingTimeout(null);
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(stopScrollingTimeout);
      clearTimeout(scrollingTimeout);
    };
  }, [isScrolling, scrollingTimeout]);
  useEffect(() => {
    if (activeSection) {
      setCompleted(false);
      const timer = setTimeout(() => setCompleted(true), 750);
      return () => clearTimeout(timer);
    }
  }, [activeSection]);
  useEffect(() => {
    if (window.innerWidth < 1400) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [isMobile]);
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
            console.log(sectionId);
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

  return (
    <nav>
      <div className={`nav__container ${isScrolling ? "show" : "hide"}`}>
        <div className="nav__handle"></div>
        <div className="nav__right">
          <button className="theme__icon" onClick={toggleTheme}>
            {isDarkMode ? <MdDarkMode /> : <MdOutlineWbSunny />}
          </button>
          <span className="line">|</span>
          <i className="nav__logo">
            <LanguageToggle />
          </i>
        </div>
        <ul className="nav__menu">
          {data.map((item) => {
            return (
              <li key={item.id}>
                <a
                  href={item.link}
                  className={`${
                    activeSection === item.link.replace("#", "")
                      ? `active ${completed ? "animation-complete" : ""}`
                      : ""
                  }`}
                  aria-current={
                    activeSection === item.link.replace("#", "")
                      ? "true"
                      : "false"
                  }
                >
                  {item.title} - 0{item.id}
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href={CV}
          download={
            language === "en"
              ? "NicolasGauthier_Dev.pdf"
              : "NicolasGauthier_Dev_fr.pdf"
          }
          className="cv"
        >
          <span className="cv__text">{language === "en" ? "CV" : "CV"}</span>{" "}
          <LiaCloudDownloadAltSolid className="icon" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
