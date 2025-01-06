import { createContext, useContext, useReducer, useEffect } from "react";
import themeReducer from "./themeReducer";
import React from "react";

export const ThemeContext = createContext();

const initialThemeState = JSON.parse(localStorage.getItem("themeSettings")) || {
  primary: "color-1",
};

export const ThemeProvider = ({ children }) => {
  const [themeState, dispatchTheme] = useReducer(
    themeReducer,
    initialThemeState
  );

  const themeHandler = (buttonClassName) => {
    dispatchTheme({ type: buttonClassName });
  };

  //Save theme settings to local storage
  useEffect(() => {
    localStorage.setItem("themeSettings", JSON.stringify(themeState));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeState.primary]);

  return (
    <ThemeContext.Provider value={{ themeState, themeHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};

//Hook to use Theme context wherever we want
export const useThemeContext = () => {
  return useContext(ThemeContext);
};
