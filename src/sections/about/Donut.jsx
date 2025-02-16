import React, { useState, useCallback, useEffect, useRef } from "react";
import { arc, pie } from "d3-shape";
import { easeExpOut } from "d3-ease";
import sortBy from "lodash/sortBy";
import { NodeGroup } from "react-move";
import AboutImageColored from "../../assets/header2-removebg-colored.png";
import "./donut.css";
import useVisibility from "../../hooks/useVisibility.js";
import { useLanguage } from "../../theme/LanguageContext.js";
import { useThemeContext } from "../../context/theme-context.js";

const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - (min + 1))) + min;

const mockData = [
  { name: "Python" },
  { name: "NextJs" },
  { name: "Volleyball" },
  { name: "NodeJs" },
  { name: "ReactJs" },
  { name: "Java" },
];

const pieLayout = pie()
  .value((d) => d.value)
  .sort(null);

const Donut = () => {
  const { themeState } = useThemeContext();
  const [arcs, setArcs] = useState([]);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const updateArcs = useCallback(() => {
    const data = mockData.map(({ name }) => ({
      name,
      value: getRandom(10, 55),
    }));
    setArcs(pieLayout(sortBy(data, (d) => d.name)));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < 1200);
      setIsMobile(window.innerWidth < 700);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    updateArcs();
    const interval = setInterval(updateArcs, 3000);
    return () => clearInterval(interval);
  }, [updateArcs]);

  const view = isMobile ? [240, 240] : isTablet ? [850, 850] : [1200, 1200];
  const dims = [view[0], view[1]];
  const radius = isMobile ? 90 : isTablet ? 250 : 500;
  const imageSize = radius * 1.4;
  const fontSize = isMobile ? "0.6rem" : isTablet ? "1.5rem" : "3.7rem";

  const innerArcPath = arc()
    .innerRadius(radius * 0.7)
    .outerRadius(radius * 0.9);
  const outerArcPath = arc()
    .innerRadius(radius * 1.02)
    .outerRadius(radius * 1.02);

  const mid = (d) => Math.PI > d.startAngle + (d.endAngle - d.startAngle);
  const myRef = useRef();
  const isVisible = useVisibility(myRef);
  const { language } = useLanguage();

  return (
    <section id="about" ref={myRef}>
      <h2 className={`${isVisible ? "magictime slideRightReturn" : "none"}`}>
        {language === "en" ? "Skills" : "Expertise"}
      </h2>{" "}
      <svg
        className="donut"
        width="100%"
        length="auto"
        viewBox={`0 0 ${dims[0]} ${dims[1]}`}
      >
        <g transform={`translate(${dims[0] / 2}, ${dims[1] / 2})`}>
          <image
            className={`about__image ${
              isVisible ? "magictime slideRightReturn" : "none"
            }`}
            href={
              themeState.primary === "color-1"
                ? AboutImageColored
                : AboutImageColored
            }
            x={-imageSize / 2}
            y={-imageSize / 2}
            width={imageSize}
            height={imageSize}
            style={{
              pointerEvents: "none",
              position: "relative",
            }}
          />
          <NodeGroup
            data={arcs}
            keyAccessor={(d) => d.data.name}
            start={({ startAngle }) => ({
              startAngle,
              endAngle: startAngle,
            })}
            enter={({ endAngle }) => ({
              endAngle: [endAngle],
              timing: { duration: 1000, delay: 350, ease: easeExpOut },
            })}
            update={({ startAngle, endAngle }) => ({
              startAngle: [startAngle],
              endAngle: [endAngle],
              timing: { duration: 1350, ease: easeExpOut },
            })}
          >
            {(nodes) => (
              <g
                className={`${
                  isVisible ? "magictime slideDownReturn" : "none"
                }`}
              >
                {nodes.map(({ key, data, state }) => {
                  const p1 = outerArcPath.centroid(state);
                  const p2 = [
                    mid(state)
                      ? p1[0] + radius * 0.015
                      : p1[0] - radius * 0.012,
                    p1[1],
                  ];
                  return (
                    <g key={key}>
                      <path
                        d={innerArcPath(state)}
                        className={`arc-path-${data.data.name}`}
                        opacity={1}
                        // stroke={
                        //   themeState.primary === "color-1" ? "white" : "black"
                        // }
                        strokeWidth="0"
                      />
                      <text
                        dy=""
                        fontSize={fontSize}
                        transform={`translate(${p2})`}
                        textAnchor={mid(state) ? "start" : "end"}
                      >
                        {data.data.name}
                      </text>
                      <polyline
                        fill="none"
                        stroke="none"
                        points={`${innerArcPath.centroid(state)},${p1},${p2}`}
                      />
                    </g>
                  );
                })}
              </g>
            )}
          </NodeGroup>
        </g>
      </svg>
      {/* <div className="bio" data-aos="fade-down" data-aos-duration="2000">
        {language === "en" ? (
          <p
            className="bio__text"
            data-aos="fade-down"
            data-aos-duration="2000"
          >
            Hi, I am <span className="nick">Nick</span>.<br></br> I create{" "}
            <br></br>
            <span className="nick">{currentText || "\u200B"}</span>
          </p>
        ) : (
          <p
            className="bio__text"
            data-aos="fade-down"
            data-aos-duration="2000"
          >
            Allô, je m'appelle <span className="nick">Nick</span>.<br></br> Je
            crée des <br></br>
            <span className="nick">{currentText || "\u200B"}</span>
          </p>
        )}
      </div> */}
    </section>
  );
};

export default Donut;
