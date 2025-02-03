import React from "react";

import "./styles/socials.css";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { TiSocialGithubCircular } from "react-icons/ti";
import { useEffect, useState } from "react";
import { useThemeContext } from "../context/theme-context";

const Socials = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollingTimeout, setScrollingTimeout] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState();
  const { themeState } = useThemeContext();

  useEffect(() => {
    const handleMobile = () => {
      setIsMobile(window.innerWidth < 1025);
    };

    handleMobile();

    window.addEventListener("resize", handleMobile);
  }, [isMobile]);

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
        if (!isMobile) {
          setIsScrolling(false);
          clearTimeout(scrollingTimeout);
          setScrollingTimeout(null);
        }
        return;
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(stopScrollingTimeout);
      clearTimeout(scrollingTimeout);
    };
  }, [isScrolling, scrollingTimeout]);

  useEffect(() => {
    const showNav = () => {
      const totalHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const currentScroll = window.scrollY;

      if (currentScroll + viewportHeight >= totalHeight - 10) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", showNav);

    return () => {
      window.removeEventListener("scroll", showNav);
    };
  }, []);

  return (
    <div
      className={`socials__container hover-this ${
        isScrolling ? "show " : "hide "
      } ${!isVisible ? "center" : ""}`}
    >
      <a
        href="https://www.linkedin.com/in/nicolasgauthierdev/"
        className={`${!isVisible ? "center" : ""}`}
        target="_blank"
        rel="noopner noreferrer"
      >
        <TiSocialLinkedinCircular
          color={themeState.primary === "color-1" ? "black" : "white"}
          stroke={themeState.primary === "color-1" ? "white" : "black"}
          strokeWidth={0.1}
          fill={themeState.primary === "color-1" ? "white" : "black"}
          opacity={0.9}
        />
        <span className="tooltip">LinkedIn</span>
      </a>
      <a
        href="https://github.com/Juntakk"
        className={`${!isVisible ? "center" : ""}`}
        target="_blank"
        rel="noopner noreferrer"
      >
        <TiSocialGithubCircular
          color={themeState.primary === "color-1" ? "black" : "white"}
          stroke={themeState.primary === "color-1" ? "white" : "black"}
          strokeWidth={0.1}
          fill={themeState.primary === "color-1" ? "white" : "black"}
          opacity={0.9}
        />
        <span className="tooltip">Github</span>
      </a>
    </div>
  );
};

export default Socials;
