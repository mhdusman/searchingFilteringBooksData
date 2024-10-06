import { SUCCESS, CHANGE_THEME } from "../type";


export const successMsg = (type, msgText) => (dispatch) => {
  dispatch({
    type: SUCCESS,
    payload: { type, msgText },
  });
};

export const changeTheme = (themeName) => (dispatch) => {
  dispatch({
    type: CHANGE_THEME,
    payload: { themeName },
  });
};
