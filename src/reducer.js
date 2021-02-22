import * as actions from "./constants/actionTypes";
export default function reducer(state = {}, action) {
  switch (action.type) {
    case actions.LOGGED_IN:
      console.log("Reducer", action.payload);
      return {
        userinfo: action.payload,
      };

    case actions.LOGGED_OUT:
      return {
        userinfo: action.payload,
      };

    default:
      return state;
  }
}
