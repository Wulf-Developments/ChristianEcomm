import {
  ADD_CATEGORY,
  CATEGORY_ERROR,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_CATEGORY_REQUEST,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_RESET,
} from "../constants/categoryConstants";

export const categoryReducer = (
  state = {
    loading: false,
    category: {},
    pages: 0,
    page: 0,
    products: [],
    categories: [],
    error: null,
    success: false,
  },
  action
) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        loading: false,
        category: action.payload,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        loading: false,
        categories: [action.payload, ...state.categories],
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        loading: false,
        categores: state.categories.filter(
          (category) => category._id !== action.payload
        ),
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        loading: false,
        success: true,
        category: action.payload,
      };
    case UPDATE_CATEGORY_RESET:
      return {
        ...state,
        success: false,
        category: {},
      };
    default:
      return state;
  }
};
