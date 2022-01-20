import { combineReducers } from "redux";

const initState = {
  liked: {},
};

const tvMazeMobile = (state = initState, action) => {
  switch (action.type) {
    case "TOGGLE_LIKE":
      return {
        ...state,
        liked: {
          ...state.liked,
          [action.id]: !state.liked[action.id],
        },
      };
    default:
      return state;
  }
};

export default combineReducers({ tvMazeMobile });
