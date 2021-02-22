import * as actions from "./constants/actionTypes";

export const loggedIn = (userInfo) => ({
  type: actions.LOGGED_IN,
  payload: userInfo,
});

export const loggedOut = (userInfo) => ({
  type: actions.LOGGED_OUT,
  payload: {
    userInfo,
  },
});
