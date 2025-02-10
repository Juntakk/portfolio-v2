import "./services.css";
import "magic.css/dist/magic.min.css";
import React from "react";

import { GrLaunch } from "react-icons/gr";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import { FaLaptopCode } from "react-icons/fa";
import data_en from "./data";
import data_fr from "./data_fr";
import { useLanguage } from "../../theme/LanguageContext";
import { useEffect, useRef, useState } from "react";
import useVisibility from "../../hooks/useVisibility";

//TODO make icons smaller for mobile devices
const Services = () => {
  const { language } = useLanguage();
  const data = language === "en" ? data_en : data_fr;
  const [isMobile, setIsMobile] = useState(false);
  const english = language === "en";
  const myRef = useRef();
  const isVisible = useVisibility(myRef, 0.1);

  useEffect(() => {
    if (window.innerWidth < 700) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [isMobile]);
  return (
    <section id="services" ref={myRef}>
      <h2 className={`${isVisible ? "magictime slideRightReturn" : "none"}`}>
        Services
      </h2>
      <div className="services__container">
        {/* service__card 1 */}
        <div
          className={`service__card one ${
            isVisible ? "magictime slideLeftReturn" : "none"
          }`}
        >
          <div className="face face1">
            <div className="content">
              <span>
                <TfiLayoutAccordionList size={isMobile ? 65 : 75} />
              </span>
              <h3>{data[0].title}</h3>
            </div>
          </div>
          <div className="face face2">
            <div className="content">
              <p className="">
                {isMobile
                  ? data[0].text.replace(/[^.!?]*[.!?]\s*$/, "")
                  : data[0].text}
              </p>
            </div>
          </div>
        </div>
        {/* service__card 2 */}
        <div
          className={`service__card two ${
            isVisible ? "magictime slideLeftReturn" : "none"
          }`}
        >
          <div className="face face1">
            <div className="content">
              <span>
                <FaLaptopCode size={isMobile ? 65 : 75} />
              </span>{" "}
              <h3>{data[1].title}</h3>
            </div>
          </div>
          <div className="face face2">
            <div className="content">
              <p className="">
                {isMobile
                  ? data[1].text.replace(/[^.!?]*[.!?]\s*$/, "")
                  : data[1].text}
              </p>
            </div>
          </div>
        </div>
        {/* service__card 3 */}
        <div
          className={`service__card three ${
            isVisible ? "magictime slideLeftReturn" : "none"
          }`}
        >
          <div className="face face1">
            <div className="content">
              <span>
                <GrLaunch size={isMobile ? 65 : 75} />
              </span>
              <h3>{data[2].title}</h3>
            </div>
          </div>
          <div className="face face2">
            <div className="content">
              <p className="">
                {isMobile
                  ? data[2].text.replace(/[^.!?]*[.!?]\s*$/, "")
                  : data[2].text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
