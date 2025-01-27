import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import { useModalContext } from "../context/modal-context";
import { useThemeContext } from "../context/theme-context";

const Modal = ({ className, children }) => {
  const { showModal, closeModalHandler } = useModalContext();
  const { themeState } = useThemeContext();

  if (!showModal) return null;

  return (
    <>
      <div
        id="backdrop"
        className="modal-backdrop"
        onClick={closeModalHandler}
      ></div>
      <div className={`modal-content ${className}`}>{children}</div>
    </>
  );
};

export default Modal;
