export const initialState = {
  access_token: null,
  user: null,
  userID: null,
  sidepanel_value: null,
  isButtonActive_value: null,
  isNavlinkActive_value: null,
  device: null,
  country: null,
  subscription: null,
  playing: null,
};

const propReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_ACCESS_TOKEN":
      return {
        ...state,
        access_token: payload,
      };

    case "SET_USER":
      return {
        ...state,
        user: payload,
      };

    case "SET_USER_ID":
      return {
        ...state,
        userID: payload,
      };

    case "SET_SIDEPANEL_VALUE":
      return {
        ...state,
        sidepanel_value: payload,
      };

    case "SET_ACTIVE_BUTTON_VALUE":
      return {
        ...state,
        isButtonActive_value: payload,
      };

    case "SET_ACTIVE_NAVLINK_VALUE":
      return {
        ...state,
        isNavlinkActive_value: payload,
      };

    case "SET_DEVICE":
      return {
        ...state,
        device: payload,
      };

    case "SET_COUNTRY":
      return {
        ...state,
        country: payload,
      };

    case "SET_SUBSCRIPTION":
      return {
        ...state,
        subscription: payload,
      };

    case "SET_PLAYING":
      return {
        ...state,
        playing: payload,
      };
    default:
      return state;
  }
};

export default propReducer;
