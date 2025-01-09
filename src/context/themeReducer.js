const themeReducer = (state, action) => {
  switch (action.type) {
    case "color-1":
      return { ...state, primary: "color-1" };
    case "color-2":
      return { ...state, primary: "color-2" };
    default:
      console.warn(`Unknown action type: ${action.type}`);
      return state;
  }
};

export default themeReducer;
