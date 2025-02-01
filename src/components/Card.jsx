import React from "react";
import "./styles/card.css";

const Card = ({ children, className, onClick }) => {
  return (
    <article className={`card hover-this ${className}`} onClick={onClick}>
      {children}
    </article>
  );
};

export default Card;
