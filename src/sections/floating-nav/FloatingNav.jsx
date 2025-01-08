import React, { useEffect, useState } from "react";
import data from "./data";
import Scrollspy from "react-scrollspy";
import Nav from "./Nav";
import "./floating-nav.css";

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState();

  useEffect(() => {
    const showNav = () => {
      const contactSectionHeight =
        document.getElementById("contact").scrollHeight;
      const totalHeight = document.documentElement.scrollHeight;
      const currentScroll = window.scrollY;

      if (currentScroll + 150 > totalHeight - contactSectionHeight) {
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

  return isVisible ? (
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
