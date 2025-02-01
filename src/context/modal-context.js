import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const cursor = document.querySelector(".cursor");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [themeClass, setThemeClass] = useState("");
  const showModalHandler = (data = null, theme = "") => {
    setShowModal(true);
    setModalData(data);
    setThemeClass(theme);
    document.body.style.overflow = "hidden";
  };
  const closeModalHandler = () => {
    if (cursor) {
      cursor.classList.remove("hover-cursor");
    }
    setModalData(null);
    setShowModal(false);
    setThemeClass("");
    document.body.style.overflow = "";
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        showModalHandler,
        closeModalHandler,
        modalData,
        themeClass,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
