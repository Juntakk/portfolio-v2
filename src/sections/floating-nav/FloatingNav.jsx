import React, { useEffect, useState } from "react";
import data from "./data";
import Scrollspy from "react-scrollspy";
import Nav from "./Nav";
import "./floating-nav.css";

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState();
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollingTimeout, setScrollingTimeout] = useState(null);

  //   useEffect(() => {
  //     const showNav = () => {
  //       const contactSectionHeight =
  //         document.getElementById("contact").scrollHeight;
  //       const totalHeight = document.documentElement.scrollHeight;
  //       const currentScroll = window.scrollY;

  //       if (currentScroll + 150 > totalHeight - contactSectionHeight) {
  //         setIsVisible(false);
  //       } else {
  //         setIsVisible(true);
  //       }
  //     };

  //     window.addEventListener("scroll", showNav);

  //     return () => {
  //       window.removeEventListener("scroll", showNav);
  //     };
  //   }, []);
  useEffect(() => {
    let stopScrollingTimeout;

    const handleScroll = () => {
      if (!isScrolling && !scrollingTimeout) {
        const timer = setTimeout(() => {
          setIsScrolling(true);
          setScrollingTimeout(null);
        }, 1500);
        setScrollingTimeout(timer);
      }

      clearTimeout(stopScrollingTimeout);

      stopScrollingTimeout = setTimeout(() => {
        setIsScrolling(false);
        clearTimeout(scrollingTimeout);
        setScrollingTimeout(null);
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(stopScrollingTimeout);
      clearTimeout(scrollingTimeout);
    };
  }, [isScrolling, scrollingTimeout]);

  return isScrolling ? (
    <ul id="floating__nav">
      <Scrollspy
        offset={-350}
        className="scrollspy"
        items={["header", "services", "portfolio", "about", "contact"]}
        currentClassName="active"
      >
        {data.map((item) => (
          <Nav key={item.id} item={item} />
        ))}
      </Scrollspy>
    </ul>
  ) : (
    ""
  );
};

export default FloatingNav;
