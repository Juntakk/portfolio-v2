import React, { useEffect, useRef } from "react";
import "./styles/cursor.css";

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    var elements = Array.from(document.querySelectorAll("*"));
    const handleMouseOver = (e) => {
      const target = e.target;
      if (cursorRef.current) {
        cursorRef.current.classList.add("hover-cursor");
      }
      target.classList.add("hovered-element");
    };
    const handleMouseLeave = (e) => {
      const target = e.target;

      if (cursorRef.current) {
        cursorRef.current.classList.remove("hover-cursor");
      }
      target.classList.remove("hovered-element");
    };

    elements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;
      }
    };

    document.addEventListener("mousemove", moveCursor);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return <div className="cursor" ref={cursorRef}></div>;
};

export default Cursor;
