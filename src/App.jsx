/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Navbar from "./sections/navbar/Navbar";
import Header from "./sections/header/Header";
import Services from "./sections/services/Services";
import Portfolio from "./sections/portfolio/Portfolio";
import Contact from "./sections/contact/Contact";
import FloatingNav from "./sections/floating-nav/FloatingNav";
import { useRef, useState, useEffect } from "react";
import { LanguageProvider } from "./theme/LanguageContext";
import Loader from "./components/Loader";
import Socials from "./components/Socials";
import "./particles.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Donut from "./sections/about/Donut";
import Testimonials from "./sections/testimonials/Testimonials";
import { useThemeContext } from "./context/theme-context";

const App = () => {
  const mainRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [particleColor, setParticleColor] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { themeState, themeHandler } = useThemeContext();

  const colorMap = {
    "color-1": "#92a8d1",
    "color-2": "#35405a",
  };

  const handleParticleColor = (theme) => colorMap[theme] || "color-1";

  const toggleTheme = () => {
    const main = document.getElementById("main");

    if (main.classList.contains("color-1")) {
      main.classList.remove("color-1");
      main.classList.add("color-2");
      themeHandler("color-2");
    } else {
      main.classList.remove("color-2");
      main.classList.add("color-1");
      themeHandler("color-1");
    }
  };

  //Is mobile state
  useEffect(() => {
    setIsMobile(window.innerWidth < 700);
  }, [isMobile]);

  //Particle color
  useEffect(() => {
    if (themeState) {
      const newColor = handleParticleColor(themeState.primary);
      setParticleColor(newColor);
    }
  }, [themeState]);

  //Fake Loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  //Loading Screen
  useEffect(() => {
    const loadingElement = document.querySelector(".loading-screen");
    if (loadingElement) {
      setTimeout(() => {
        loadingElement.classList.add("fade-in");
        setTimeout(() => setIsLoading(false), 2000); // Matches transition time
      }, 2000);
    } else {
      setIsLoading(false); // Fallback if element doesn't exist
    }
  }, []);

  //PARTICLES
  useEffect(() => {
    if (!particleColor) return; // Ensure particleColor is valid

    window.particlesJS("particles-js", {
      particles: {
        number: { value: 13, density: { enable: false, value_area: 2000 } },
        color: { value: particleColor },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#545454FF" },
          polygon: { nb_sides: 5 },
        },
        opacity: {
          value: 0.6,
          random: true,
          anim: { enable: false, speed: 0.08, opacity_min: 0, sync: false },
        },
        size: {
          value: isMobile ? 15 : 90,
          random: false,
          anim: { enable: false, speed: 15, size_min: 60, sync: false },
        },
        line_linked: {
          enable: false,
          distance: 15,
          color: particleColor,
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "bottom",
          random: true,
          straight: true,
          out_mode: "out",
          bounce: false,
          attract: { enable: true, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: false, mode: "bubble" },
          onclick: { enable: false, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: {
            distance: 200,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: false,
    });
  }, [particleColor]);

  //AOS init
  useEffect(() => {
    AOS.init({
      offset: 25,
    });
  }, []);

  return (
    <LanguageProvider>
      {isLoading && <Loader />}
      <div
        id="particles-js"
        className="particles__container"
        style={{
          opacity: isLoading ? 0.25 : 1,
          visibility: isLoading ? "hidden" : "visible",
          transition: "opacity 2s ease-out, background-color 1s ease-out", // Smooth transition
          width: "100%",
          height: "100%",
        }}
      ></div>
      <main className={themeState.primary} ref={mainRef} id="main">
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Socials />
        <Header isLoading={isLoading} setIsLoading={setIsLoading} />
        <div className="spacing1"></div>
        <Services />
        <div className="spacing4"></div>
        <Portfolio />
        <div className="spacing3"></div>
        <Donut />
        <div className="spacing2"></div>
        <Testimonials />
        <div className="spacing2"></div>
        <Contact />
        <FloatingNav />
      </main>
    </LanguageProvider>
  );
};

export default App;
