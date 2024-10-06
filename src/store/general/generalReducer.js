import { SUCCESS, CHANGE_THEME } from "../type";

const initializeState = {
  message: {},
  themeName: "themeOne",
};

export default (state = initializeState, action) => {

  switch (action.type) {
    case SUCCESS:
      return { ...state, message: action.payload };
    case CHANGE_THEME:
      return { ...state, themeName: action.payload.themeName };
    default:
      return state;
  }
};
