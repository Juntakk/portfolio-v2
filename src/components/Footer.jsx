import React from "react";
import "./styles/footer.css";
import { useLanguage } from "../theme/LanguageContext";

const Footer = () => {
  const language = useLanguage();
  return (
    <div className="footer__1">
      {language === "en" ? (
        <p>&copy; 2025 Nicolas H. Gauthier. All rights reserved.</p>
      ) : (
        <p>&copy; 2025 Nicolas H. Gauthier. Tous droits réservés.</p>
      )}
    </div>
  );
};

export default Footer;
