/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import "./header.css";
import { useLanguage } from "../../theme/LanguageContext";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import useVisibility from "../../hooks/useVisibility";
import React from "react";

const Header = ({ isLoading, setIsLoading }) => {
  const { language } = useLanguage();
  const texts =
    language === "en"
      ? ["Web", "Mobile", "Video Game"]
      : ["Web", "Mobile", "de Jeux Vidéo"];
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(10);
  const [isPaused, setIsPaused] = useState(false);
  const myRef = useRef();
  const isVisible = useVisibility(myRef);

  useEffect(() => {
    const handleTyping = () => {
      if (isPaused) {
        return;
      }
      const fullText = texts[currentIndex];
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setIsPaused(true);
          setTimeout(() => setIsPaused(false), 1500);
          setIsDeleting(true);
          setTypingSpeed(100); // Pause before deleting
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setTypingSpeed(175); // Reset typing speed
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length); // Move to next text
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typingSpeed, texts, currentIndex, isPaused]);

  return (
    <section id="header" ref={myRef}>
      <div
        className={`header__container ${
          isVisible ? "magictime slideLeftReturn" : "none"
        }`}
      >
        <h1
          className={`myName ${!isLoading ? "fade-left-active" : ""}`}
          style={{
            opacity: isLoading ? 0 : 1,
            transition: "opacity 2s ease, transform 2s ease",
            fontSize: "5.5rem",
            color: "var(--color-black)",
          }}
        >
<<<<<<< Updated upstream
          <span className="typing iceland-regular">Nicolas H. Gauthier</span>
=======
          <span className="typing iceland-regular hover-this">
            Nicolas Gauthier
          </span>
>>>>>>> Stashed changes
        </h1>
        <p
          className={`desc_p typing-effect ${
            !isLoading ? "fade-right-active" : ""
          }`}
          style={{
            opacity: isLoading ? 0 : 1,
            transition: "opacity 2s ease, transform 2s ease",
          }}
        >
          {" "}
          {language === "en"
            ? currentText + " Developer"
            : "Développeur " + currentText}
        </p>
        <a href="#services" className="down__arrow hover-this">
          <span>
            <MdKeyboardDoubleArrowDown />
          </span>
        </a>
      </div>
    </section>
  );
};

export default Header;
