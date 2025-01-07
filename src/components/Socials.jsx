/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import "./styles/socials.css";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquareGithub } from "react-icons/fa6";
import { useEffect, useState } from "react";

const Socials = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollingTimeout, setScrollingTimeout] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleMobile = () => {
      setIsMobile(window.innerWidth < 700);
    };

    handleMobile();

    window.addEventListener("resize", handleMobile);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

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

  return (
    <div className={`socials__container ${isScrolling ? "show" : "hide"}`}>
      <a href="https://www.linkedin.com/in/nickhabashigauthier/">
        <IoLogoLinkedin />
        <span className="tooltip">LinkedIn</span>
      </a>
      <a href="https://github.com/Juntakk">
        <FaSquareGithub />
        <span className="tooltip">Github</span>
      </a>
    </div>
  );
};

export default Socials;
