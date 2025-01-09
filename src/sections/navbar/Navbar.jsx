import { MdDarkMode } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

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
    if (isMobile) return;
    let stopScrollingTimeout;

    const handleScroll = () => {
      if (!isScrolling && !scrollingTimeout) {
        const timer = setTimeout(() => {
          setIsScrolling(true);
          setScrollingTimeout(null);
        }, 1000);
        setScrollingTimeout(timer);
      }

      clearTimeout(stopScrollingTimeout);

      stopScrollingTimeout = setTimeout(() => {
        setIsScrolling(false);
        clearTimeout(scrollingTimeout);
        setScrollingTimeout(null);
      }, 1000);
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
    if (window.innerWidth < 700) {
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

  const [isOpen, setIsOpen] = useState(false);
  const [startX, setStartX] = useState(null); // Tracks initial drag position

  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDragStart = (e) => {
    setStartX(e.clientX); // Capture the initial X position
  };

  const handleDragMove = (e) => {
    if (startX === null) return;

    const deltaX = e.clientX - startX;

    // If dragging enough to the right, open the navbar
    if (deltaX < 10 && !isOpen) {
      setIsOpen(true);
      setStartX(null); // Reset startX to prevent repeated toggling
    }

    // If dragging enough to the left, close the navbar
    if (deltaX > -10 && isOpen) {
      setIsOpen(false);
      setStartX(null); // Reset startX to prevent repeated toggling
    }
  };

  const handleDragEnd = () => {
    setStartX(null); // Reset when the drag ends
  };

  return (
    <nav
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
    >
      <div className={`nav__container ${isOpen ? "show" : "hide"}`}>
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
          {data.map((item) => (
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
          ))}
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
      {/* Handle */}
      <div
        className="nav__handle"
        onClick={toggleNavbar}
        title={isOpen ? "Close Navbar" : "Open Navbar"}
      >
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
