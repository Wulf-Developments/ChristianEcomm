import {
  CATEGORY_ERROR,
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_CATEGORY_REQUEST,
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
        category: action.payload.category,
        pages: action.payload.pages,
        page: action.payload.page,
        products: action.payload.products,
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
