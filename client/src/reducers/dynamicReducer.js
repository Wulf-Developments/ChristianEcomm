import {
  DYNAMIC_CONTENT_ERROR,
  DYNAMIC_CONTENT_REQUEST,
  GET_LOGO,
} from "../constants/dynamicConstants";

export const dynamicReducer = (
  state = {
    loading: false,
    logo: "",
    error: "",
  },
  action
) => {
  switch (action.type) {
    case DYNAMIC_CONTENT_REQUEST:
      return { ...state, loading: true };
    case DYNAMIC_CONTENT_ERROR:
      return { ...state, loading: false, error: action.payload };
    case GET_LOGO:
      return { ...state, loading: false, logo: action.payload };
    default:
      return state;
  }
};
