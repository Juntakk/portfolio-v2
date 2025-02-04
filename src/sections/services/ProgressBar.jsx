import { useEffect, useState, useRef } from "react";
import "./progress_bar.css";
import React from "react";

const ProgressBar = (props) => {
  const { title } = props;
  const [isVisible, setIsVisible] = useState(false);

  const progressBarRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 1 } // Trigger when 100% of the element is visible
    );

    if (progressBarRef.current) {
      observer.observe(progressBarRef.current);
    }

    return () => {
      if (progressBarRef.current) {
        observer.unobserve(progressBarRef.current);
      }
    };
  }, []);

  return (
    <section id="progress" ref={progressBarRef}>
      <div className="skill-box">
        <div className="skill-bar">
          <span
            className={`skill-per ${title} ${isVisible ? "animate" : ""}`}
          ></span>
        </div>
      </div>
    </section>
  );
};

export default ProgressBar;
